import { resolve } from 'path';
import { DefinePlugin } from 'webpack';

export const entry = "./src/index.js";
export const output = {
    path: resolve(__dirname, './static/frontend'),
    filename: "[name].js",
};
export const module = {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
            },
        },
    ],
};
export const optimization = {
    minimize: true,
};
export const plugins = [
    new DefinePlugin({
        "process.env:NODE.ENV": JSON.stringify("production")
    }),
];