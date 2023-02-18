const path = require("path")

module.exports = {
    mode: "development", //mode: "production",
    entry: {
        index: { import: "./src/index.js" }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: 'file-loader'
            }
        ],
    },
    output: {
        filename: "es.chart.js",
        library: 'essenza',
        libraryTarget: 'umd',
        clean: true
    },
    externals: {
        react: 'react',
        echarts: 'echarts'
    },
}