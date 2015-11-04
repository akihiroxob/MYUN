var path = require('path');
var jsSrcDir    = './src/';
var jsDestDir   = './build/';

module.exports = {
    webpack: {
        cache: true,
        entry:  jsSrcDir + '/index.js',
        sourceMapFilename: "myun.js.map",
        output: {
            filename: 'myun.js',
            path: __dirname + '/../build',
            library: "MYUN",
            libraryTarget: "umd"
        },
        resolve: {
            extenstions: ['jsx', '.js']
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                }
            ]
        }
    },
    watch: {
        js: './js/src/**',
    }
};
