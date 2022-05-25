const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV === "production";
const stylesHandler = isProduction
    ? MiniCssExtractPlugin.loader
    : "style-loader";
const config = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
    },
    devServer: {
        historyApiFallback: true,
        contentBasePublicPath: path.join(__dirname, "dist"),
        open: true,
        host: "localhost",
        port: 8083,
        contentBase: "./",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html",
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'public/images'),
                    to:   path.resolve(__dirname, 'dist/images')
                }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: "ts-loader",
                exclude: ["/node_modules/"],
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, "css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    stylesHandler,
                    'css-modules-typescript-loader',
                    'css-loader',
                    'sass-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: "asset/resource",
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },

};

module.exports = () => {
    if (isProduction) {
        config.mode = "production";

        config.plugins.push(new MiniCssExtractPlugin());
    } else {
        config.mode = "development";
    }
    return config;
};