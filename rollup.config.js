import {babel} from "@rollup/plugin-babel"
import crypto from "crypto"
import childProcess from "child_process"
import filesize from "rollup-plugin-filesize"
import fs from "fs/promises"
import {nodeResolve} from "@rollup/plugin-node-resolve"
import progress from "rollup-plugin-progress"
import {terser} from "rollup-plugin-terser"
import typescript from "@rollup/plugin-typescript"

const banner = `/**
 * KK cabinets
 * @copyright 2020 - 2021 Luke Zhang, Ethan Lim
 *
 * https://luke-zhang-04.github.io
 * https://github.com/ethanlim04
 *
 * @license GPL-3.0-or-later
 */

`

/**
 * Executes command in the shell
 * @param {string} command - command to execute
 * @returns {Promise<string>} - command output from stdout or stderr
 */
const exec = (command) => new Promise((resolve, reject) => {
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
const hash = (content) => crypto.createHash("sha384")
    .update(content.toString())
    .digest("base64")

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
    const scripts = (await fs.readdir("./src/")).filter((dir) => dir[0] !== "_"),
        configs = [],
        isProduction = process.env.NODE_ENV !== "dev",
        plugins = [
            progress(),
            typescript(),
            nodeResolve(),
            ...isProduction ? [
                babel({
                    babelrc: false,
                    babelHelpers: "bundled",
                    presets: ["@babel/preset-env"],
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
                        comments: (_, {value: val}) => (
                            /licen[sc]e|copyright|@preserve|^!/gui
                        ).test(val),
                    },
                }),
                filesize(),
            ] : [],
        ]

    for (const script of scripts) {
        if (process.env.NODE_ENV !== "dev" || await fileDidChange(`./src/${script}`)) {
            const [entry] = (await fs.readdir(`./src/${script}`))
                .filter((dir) => (/index/u).test(dir))

            configs.push({
                input: `./src/${script}/${entry}`,
                output: {
                    file: `${process.env.NODE_ENV == "dev" ? "public" : "build"}/js/${script}.js`,
                    format: "iife",
                    banner,
                },
                plugins,
                external: [/@babel\/runtime/],
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
