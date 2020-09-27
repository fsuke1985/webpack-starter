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
        'js/style.css': `${SRC}/style.scss`,
    },
    output: {
        path: path.resolve(__dirname, DEST + BASE_DIR ),
        filename: 'js/bundle.js',
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
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 2,
                            }
                        },
                        'postcss-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                includePaths: [ `${SRC}/scss` ],
                            },
                        }
                    ]
                }),
            },
        ]
    },
    resolve: {
       extensions: [ '.tsx', '.ts', '.js' ], 
    }
};
