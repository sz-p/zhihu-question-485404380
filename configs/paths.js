const path = require("path");
let resolveApp = undefined;
if (process.env.NODE_ENV === "production") {
  resolveApp = (relativePath) => path.resolve(__dirname, "./", relativePath);
} else {
  resolveApp = (relativePath) => path.resolve(__dirname, "../", relativePath);
}
console.log();
export default {
  errorFile_CSV: resolveApp("./logs/error.csv"),
  successFile_CSV: resolveApp("./logs/success.csv"),
  infoFile_CSV: resolveApp("./logs/info.csv"),

  header: resolveApp("./configs/header.js"),
  mainjs: resolveApp("./src/main.ts"),
  build: resolveApp("./dist"),

  configJson: resolveApp("./configs/config.json"),
  defaultConfigJson: resolveApp("./configs/config.default.json"),

  downloaded: resolveApp("./downloaded"),
  downloadDir: resolveApp("./download"),
  buckets: resolveApp("./status/buckets.json"),
  status: resolveApp("./status/"),
  packageJson: resolveApp("./package.json"),
};
