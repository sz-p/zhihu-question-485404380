import * as packageJson from "../package.json";
process.env.NODE_ENV = "development"
try {
  require("../src/main.ts");
  console.log(
    "\x1B[32m%s\x1B[0m",
    `${packageJson.name} running !`
  );
} catch (e) {
  console.log("\x1B[31m%s\x1B[0m", `${packageJson.name} startup failed`);
  console.log("\x1B[31m%s\x1B[0m", e);
}
