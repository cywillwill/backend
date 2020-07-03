const path = require('path');
const nodeExternals = require('webpack-node-externals')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const webpackConfig = {
    target: 'node', //默认为‘web’
    mode: 'development', //告知webpack使用相应模式的内置优化
    entry: {
        servers: path.join(__dirname, './src/index.js') 
    },
    output: {
        filename: '[name].bundle.js', //[name]是入口名称
        path: path.join(__dirname, './dist')
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: [path.join(__dirname, './node_modules')]
            }
        ]
    },
    externals: [nodeExternals()],
    plugins: [
        new CleanWebpackPlugin()
    ],
    node: {
        console: true,
        global: true,
        process: true,
        Buffer: true,
        __filename: true,
        __dirname: true,
        setImmediate: true,
        path: true
    }
}

module.exports = webpackConfig