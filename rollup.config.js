import {babel} from "@rollup/plugin-babel"
import commonjs from "@rollup/plugin-commonjs"
import fs from "fs/promises"
import {nodeResolve} from '@rollup/plugin-node-resolve';

const config = async () => {
    const scripts = (await fs.readdir("./src/")).filter((dir) => dir[0] !== "_"),
        configs = []

    for (const script of scripts) {
        configs.push({
            input: `./lib/${script}`,
            output: {
                file: `public/js/${script}.js`,
                format: "iife",
                banner: `/**
 * KK cabinets
 * @copyright 2020 - 2021 Luke Zhang
 * @license GPL-3.0
 * @preserve
 */\n`,
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
    }

    return configs
}

export default config()
