const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

const dist = path.resolve(__dirname, "dist");

module.exports = {
  mode: "production",
  entry: {
    index: "./web/index.js"
  },
  output: {
    path: dist,
    filename: "[name].js"
  },
  devServer: {
    contentBase: dist,
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      }
    ],
  },
  plugins: [
    new CopyPlugin(
      {
        patterns: [
          {
            from: './img/*.png',
            to: dist,
            context: './web/',
          }
        ],
      }
    ),
    new HtmlPlugin({
      title: 'Citrus',
    }),
    new WasmPackPlugin({
      crateDirectory: __dirname,
    }),
  ],
  experiments: {
    asyncWebAssembly: true,
  },
};
