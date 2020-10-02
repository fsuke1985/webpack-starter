var readConfig = require('read-config');
var path = require('path');
var SRC = './src';
var DEST = './public';
var HOST = process.env.HOST || '0.0.0.0';
var PORT = process.env.PORT || 3000;
var constants = readConfig(SRC + "/constants.yml");
var BASE_DIR = constants.BASE_DIR;
module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        'js/bundle.js': SRC + "/index.ts",
        'css/style.css': SRC + "/scss/style.scss",
    },
    output: {
        path: path.resolve(__dirname, DEST + BASE_DIR),
        filename: '[name]',
        publicPath: BASE_DIR,
    },
    devServer: {
        host: HOST,
        port: PORT,
        contentBase: DEST,
        hot: true,
        watchContentBase: true,
        openPage: path.relative('/', BASE_DIR),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    }
};
//# sourceMappingURL=webpack.config.js.map