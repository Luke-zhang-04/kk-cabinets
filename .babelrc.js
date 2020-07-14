module.exports = {
    presets: ["@babel/preset-env"],
    plugins: [
        "transform-minify-booleans",
        "minify-constant-folding",
        "minify-dead-code-elimination",
        "transform-remove-console",
    ],
    shouldPrintComment: (val) => /@license|license|@preserve|@copyright/.test(val),
}
