module.exports = {
    presets: ["@babel/preset-env"],
    ignore: ["*.ts"],
    plugins: [
        "transform-minify-booleans",
        "minify-constant-folding",
        "minify-dead-code-elimination",
        "transform-remove-console",
    ],
    shouldPrintComment: (val) => /@license|license|@preserve|@copyright/.test(val),
}
