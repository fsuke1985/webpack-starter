const readConfig = require('read-config');
const path       = require('path');

const SRC = './src';
const DEST = './public';

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3000;

const constants = readConfig(`${SRC}/constants.yml`);
const { BASE_DIR } = constants;

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        'js/bundle.js': `${SRC}/index.ts`,
        'css/style.css': `${SRC}/scss/style.scss`,
    },
    output: {
        path: path.resolve(__dirname, DEST + BASE_DIR ),
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
       extensions: [ '.tsx', '.ts', '.js' ], 
    }
};
