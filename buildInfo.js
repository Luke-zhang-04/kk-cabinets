/**
 * @copyright (C) 2020 - 2021 Luke Zhang
 *
 * @author Luke Zhang
 * https://luke-zhang-04.github.io/
 *
 * @license Modified-BSD-3-Clause
 * @see {@link https://github.com/Luke-zhang-04/peak-edu/blob/master/LICENSE}
 */

const fs = require("fs")

/**
 * @template T
 * @param {(...unknown[])=> T} func - callback function
 * @returns {T | void} void if error
 */
const niceTry = (func) => {
    try {
        return func()
    } catch {}
}

const buildInfo = niceTry(() => require("./buildInfo.json")) ?? {}

if (require.main === module) {
    const stdinBuffer = fs.readFileSync(0, "utf-8") // STDIN_FILENO = 0,
    let [file, checksum] = stdinBuffer.toString().trim().split(":")

    checksum = checksum.replace(/-/gui, "").trim()

    if (buildInfo[file] && buildInfo[file] === checksum) {
        console.log(0)
    } else {
        buildInfo[file] = checksum

        fs.writeFile("buildInfo.json", JSON.stringify(buildInfo) + "\n", () => {
            console.log(1)
        })
    }
}
