'use strict';

const path = require('path');
const NODE_ENV = process.env.NODE_ENV || 'development';

console.log(NODE_ENV);
const webpack = require('webpack');

module.exports = {
    entry: './src/js/tilemap.ts',
    output: {
        filename: 'tilemap.js',
        path: path.resolve(__dirname, 'dist'),
        library: "Tilemap"
    },
    watch: NODE_ENV === 'development',
    // devtool: "inline-source-map"
    devtool: NODE_ENV === 'development' ? "cheap-inline-module-source-map" : false,
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({ NODE_ENV: JSON.stringify(NODE_ENV) }),
    ],

    resolve: {
        modules: ['node_modules'],
        extensions: ['.css', '.js', '.ts'],
        // alias: {
        //     "Phaser": path.join(phaserModule, 'phaser-split.js'),
        //     "PIXI": path.join(phaserModule, 'pixi.js'),
        //     "p2": path.join(phaserModule, 'p2.js')
        // }
    },

    module: {
        rules: [
        	{
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            },

            //  {
            //     test: /\.ts$/,
            //     loaders: ['awesome-typescript-loader', 'angular2-template-loader?keepUrl=true'],
            //     exclude: [/\.(spec|e2e)\.ts$/]
            // },
            // {  
            //     test: /\.html$/,
            //     loader: 'html-loader'
            //   },
        ]
    }
};