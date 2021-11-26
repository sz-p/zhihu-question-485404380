import paths from "../configs/paths"
import * as packageJson from "../package.json";
process.env.NODE_ENV = 'production';
process.env.BABEL_ENV = 'production';
const webpack = require('webpack');
const fs = require('fs');
const webpackConfig = require('../configs/webpack.config');

const compiler = webpack(webpackConfig);

function deleteFolder(buildPath: string) {
  fs.rmdirSync(buildPath, { recursive: true });
}

const removeBuildDir = function () {
  const path = paths.build;
  deleteFolder(path);
}

const createBuildDir = function () {
  const path = paths.build;
  fs.mkdirSync(path)
}

const createPackageJson = function () {
  const devPackageJson = require(paths.packageJson);
  let proPackageJson = {
    name: devPackageJson.name,
    version: devPackageJson.version,
    scripts: {
      start: `node ./starter.js`
    }
  };
  fs.writeFileSync(paths.build + '/package.json', JSON.stringify(proPackageJson, null, 2));
}

const createStarter = function (bundleFileName: string) {
  const startScriptSrc =
    `process.env.NODE_ENV = 'production'
  try {
  require("./${bundleFileName}");
  console.log(
    "\x1B[32m%s\x1B[0m",
    "${packageJson.name} running !"
  );
} catch (e) {
  console.log("\x1B[31m%s\x1B[0m", "${packageJson.name} startup failed");
  console.log("\x1B[31m%s\x1B[0m", e);
}`;
  fs.writeFileSync(paths.build + '/starter.js', startScriptSrc);
}

const runWebPack = function () {
  compiler.run((err: { message: any; }, stats: { toJson: (arg0: { all: boolean; warnings: boolean; errors: boolean; }) => any; compilation: { assets: {}; }; }) => {
    let messages;
    if (err) {
      messages = {
        errors: [err.message]
      };
      console.log(messages);
    } else {
      messages = stats.toJson({ all: false, warnings: true, errors: true });
      createStarter(Object.keys(stats.compilation.assets)[0])
      createPackageJson();
    }
    if (messages.errors.length) {
      if (messages.errors.length > 1) {
        messages.errors.length = 1;
      }
      console.log(new Error(messages.errors.join('\n\n')));
    }
  });
}


removeBuildDir();
createBuildDir();
runWebPack();

