import {babel} from "@rollup/plugin-babel"
import crypto from "crypto"
import childProcess from "child_process"
import commonjs from "@rollup/plugin-commonjs"
import filesize from "rollup-plugin-filesize"
import fs from "fs/promises"
import license from "rollup-plugin-license"
import {nodeResolve} from "@rollup/plugin-node-resolve"
import progress from "rollup-plugin-progress"
import svelte from "rollup-plugin-svelte"
import sveltePreprocess from "svelte-preprocess"
import {terser} from "rollup-plugin-terser"
import typescript from "@rollup/plugin-typescript"

const banner = (filename) =>
    `/*! For license information please see ${filename}.js.LICENSE.txt */\n`

const bannerComment = `KK Cabinets
License: GPL-3.0-or-later
https://luke-zhang-04.github.io
https://github.com/ethanlim04

Copyright (C) 2020 - 2021 Luke Zhang, Ethan Lim
===

`

/**
 * Executes command in the shell
 * @param {string} command - command to execute
 * @returns {Promise<string>} - command output from stdout or stderr
 */
const exec = (command) =>
    new Promise((resolve, reject) => {
        childProcess.exec(command, (err, stdout, stderr) => {
            if (err) {
                return reject(err)
            }

            return resolve(stderr || stdout)
        })
    })

/**
 * SHA384 function
 * @param {{toString: () => string}} content - content to hash
 */
const hash = (content) => crypto.createHash("sha384").update(content.toString()).digest("base64")

/**
 * @template T
 * @param {()=> T} func - callback function
 * @returns {T | void} void if error
 */
const niceTry = (func) => {
    try {
        return func()
    } catch {}
}

/**
 *
 * @param {import("rollup-plugin-license").Dependency} dep - dependency
 * @returns {string}
 */
const dependencyToString = (dep) => {
    const lines = [`${dep.name} ${dep.version}`, `License: ${dep.license}`]

    if (dep.homepage) {
        lines.push(`${dep.homepage}`)
    } else if (dep.repository) {
        lines.push(`${dep.repository.url}`)
    } else if (dep.author) {
        lines.push(`${dep.author.text()}`)
    }

    if (dep.licenseText) {
        lines.push("")
        const depText = dep.licenseText.split("\n")

        lines.push(depText.find((text) => /Copyright/.test(text)) ?? depText[0])
        lines.push("===\n")
    }

    return lines.join("\n")
}

/**
 * Compares file hash with previous hash and updates it
 * @param {string} fileName - dir or filename to hash
 * @returns {Promise<boolean>} if file changed
 */
const fileDidChange = async (fileName) => {
    try {
        const checksum = hash(await exec(`tar cf - \"${fileName}\"`)),
            buildInfo = (await niceTry(() => import("./buildInfo.json"))).default ?? {}

        if (buildInfo[fileName] === checksum) {
            return false
        }

        buildInfo[fileName] = checksum

        await fs.writeFile("./buildInfo.json", JSON.stringify(buildInfo))

        return true
    } catch (err) {
        console.error(err)

        return true
    }
}

const config = async () => {
    const scripts = (await fs.readdir("./src/")).filter((dir) => dir[0] !== "_")

    /**
     * @type {import("rollup").RollupOptions[]}
     */
    const configs = []
    const isProduction = process.env.NODE_ENV !== "dev"

    // prettier-ignore
    /**
     * @param {string} script - script name
     * @returns {import("rollup").Plugin[]}
     */
    const plugins = (script) => [
        typescript({
            target: isProduction ? undefined : "ESNext" // Production: use tsconfig value
        }),
        svelte({
            preprocess: [sveltePreprocess({sourceMap: true})],
            compilerOptions: {
                // enable run-time checks when not in production
                dev: !isProduction,
                hydratable: false,
                sourcemap: true,
            },
        }),
        nodeResolve(),
        commonjs(),
        ...isProduction
            ? [
                license({
                    thirdParty: {
                        includePrivate: true,
                        output: {
                            template: (deps) => bannerComment + (deps.length > 0
                                ? deps.map((dep) => dependencyToString(dep)).join("\n")
                                : "No third parties dependencies"),
                            file: `${
                                process.env.NODE_ENV == "dev" ? "public" : "build"
                            }/js/${script}.js.LICENSE.txt`,
                            encoding: "utf-8",
                        },
                    },
                }),
                babel({
                    babelrc: false,
                    babelHelpers: "bundled",
                    presets: [
                        ["@babel/preset-env", {
                            // corejs: 3, useBuiltIns: "usage"
                        }]
                    ],
                    minified: false,
                    comments: true,
                }),
                terser({
                    mangle: {
                        properties: {
                            regex: /^_/u, // Mangle private properties
                        },
                    },
                    format: {
                        comments: /For license information/u,
                    },
                }),
                filesize(),
            ]
        : [],
        progress(),
    ]

    for (const script of scripts) {
        if (process.env.NODE_ENV !== "dev" || (await fileDidChange(`./src/${script}`))) {
            const [entry] = (await fs.readdir(`./src/${script}`)).filter((dir) =>
                /index/u.test(dir),
            )

            configs.push({
                input: `./src/${script}/${entry}`,
                output: {
                    file: `${process.env.NODE_ENV === "dev" ? "public" : "build"}/js/${script}.js`,
                    format: "iife",
                    banner: process.env.NODE_ENV === "dev" ? undefined : banner(script),
                    sourcemap: process.env.NODE_ENV !== "dev" || "inline",
                },
                plugins: plugins(script),
            })
        } else {
            console.log(`No changes found in src/${script}, skipping.`)
        }
    }

    if (configs.length === 0) {
        process.exit(0)
    }

    return configs
}

export default config()
