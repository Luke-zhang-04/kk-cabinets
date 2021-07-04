/**
 * KK Cabinets
 * @copyright 2020 - 2021 Luke Zhang, Ethan Lim
 * @author Luke Zhang, Ethan Lim
 *
 * https://luke-zhang-04.github.io
 * https://github.com/ethanlim04
 *
 * @license GPL-3.0-or-later
 */

/// <reference types="svelte"/>

import App from "./main.svelte"

const app = new App({
    target: document.getElementById("gallery-root")!,
    props: {},
})

export default app
