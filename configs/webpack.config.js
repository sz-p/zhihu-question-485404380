import paths from "./paths";
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const SimpleProgressPlugin = require("webpack-simple-progress-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  target: "node",
  node: {
    global: false,
    __filename: false,
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.ts/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  entry: paths.mainjs,
  output: {
    path: paths.build,
    filename: "bundle.[hash:8].js",
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  plugins: [
    new SimpleProgressPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: "configs/config.default.json", to: "configs/config.default.json" },
        { from: "configs/config.json", to: "configs/config.json" },
        { from: "configs/config.temp.json", to: "configs/config.temp.json" },
        { from: "logs", to: "logs" },
        { from: "download", to: "download" },
      ],
    }),
  ],
};
