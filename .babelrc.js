module.exports = {
    presets: ["@babel/preset-env"],
    plugins: [
        [
            "@babel/plugin-transform-runtime", {
                regenerator: true,
            },
        ]
    ],
    comments: false,
    shouldPrintComment: () => false,
}
