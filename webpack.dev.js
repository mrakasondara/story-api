const path = require("path");
const common = require("./webpack.common.js");
const { merge } = require("webpack-merge");
const { watchFile } = require("fs");

module.exports = merge(common, {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    static: path.resolve(__dirname, "dist"),
    watchFiles: ["src/**/*"],
    port: 9000,
    client: {
      overlay: {
        errors: true,
        warnings: true,
      },
    },
  },
});
