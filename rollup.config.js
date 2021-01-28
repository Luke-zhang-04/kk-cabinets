import {babel} from "@rollup/plugin-babel"
import commonjs from "@rollup/plugin-commonjs"
import crypto from "crypto"
import childProcess from "child_process"
import fs from "fs/promises"
import {nodeResolve} from "@rollup/plugin-node-resolve"

const banner = `/**
 * KK cabinets
 * @copyright 2020 - 2021 Luke Zhang
 * @license GPL-3.0
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
    const scripts = (await fs.readdir("./lib/")).filter((dir) => dir[0] !== "_"),
        configs = []

    for (const script of scripts) {
        if (process.env.NODE_ENV !== "dev" || await fileDidChange(`./lib/${script}`)) {
            configs.push({
                input: `./lib/${script}`,
                output: {
                    file: `${process.env.NODE_ENV == "dev" ? "public" : "build"}/js/${script}.js`,
                    format: "iife",
                    banner,
                },
                plugins: [
                    commonjs(),
                    nodeResolve(),
                    process.env.NODE_ENV === "dev" ? undefined : babel({
                        babelrc: true,
                        babelHelpers: "bundled",
                    })
                ]
            })
        } else {
            console.log(`No changes found in lib/${script}, skipping.`)
        }
    }

    if (configs.length === 0) {
        process.exit(0)
    }

    return configs
}

export default config()
