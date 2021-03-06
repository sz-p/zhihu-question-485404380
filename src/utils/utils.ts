import * as fs from 'fs';
import * as path from 'path';
import paths from "../../configs/paths";
import merge from "lodash/merge";
export const isPathExists = function (p: string): boolean {
  try {
    fs.accessSync(p);
  } catch (err) {
    return false;
  }
  return true;
};

export const sleep = function (timeout: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => { resolve() }, timeout)
  })
}

export const getCityNameHash = function () {
  const cityString = fs.readFileSync(path.resolve(__dirname, "./city.json"), 'utf8')
  const cityJson = JSON.parse(cityString);
  return cityJson
}

export const getCityCountFilePath = function () {
  const { QUESTION_ID } = getConfig()
  return path.resolve(paths.downloadDir, QUESTION_ID, "cityCount.json")
}

export const writeTextToCityCountFile = function (text: string) {
  const filePath = getCityCountFilePath();
  fs.writeFileSync(filePath, text, { flag: "w+" })
}

export const getAnswerListFilePath = function () {
  const { QUESTION_ID } = getConfig()
  return path.resolve(paths.downloadDir, QUESTION_ID, "answerList.txt")
}
export const getAnswerContentTextDirPath = function () {
  const { QUESTION_ID } = getConfig()
  return path.resolve(paths.downloadDir, QUESTION_ID, "answerContentText")
}
export const writeAnswerContentToFile = function (fileName: string, content: string) {
  const { QUESTION_ID } = getConfig()
  const filePath = path.resolve(paths.downloadDir, QUESTION_ID, "answerContentText", fileName)
  fs.writeFileSync(filePath, content)
}
export const createAnswerContentTextFile = function () {
  const { QUESTION_ID } = getConfig()
  const dirPath = path.resolve(paths.downloadDir, QUESTION_ID, "answerContentText")
  if (isPathExists(dirPath)) return
  fs.mkdirSync(dirPath)
}
export const createQuestionDirInDownloadDir = function () {
  const { QUESTION_ID } = getConfig()
  createNotExistsDirInDownloadDir(QUESTION_ID)
}
export const createNotExistsDirInDownloadDir = function (dirInDownloadPath: string) {
  const dirPath = path.resolve(paths.downloadDir, dirInDownloadPath)
  if (isPathExists(dirPath)) return
  fs.mkdirSync(dirPath)
}
export const getConfigFromFile = function (configPath: string): false | {
  [key: string]: any
} {
  if (!isPathExists(configPath))
    return false
  const configString = fs.readFileSync(configPath, 'utf8')
  const configJson = JSON.parse(configString);
  return configJson
}
export const getConfig = function (): {
  [key: string]: any;
} {
  const defaultConfig = getConfigFromFile(paths.defaultConfigJson)
  const config = getConfigFromFile(paths.configJson)
  if (!defaultConfig && !config) {
    console.error("No config file")
    process.exit(1)
  }
  if (defaultConfig && config) {
    return merge(defaultConfig, config)
  }
  if (config) {
    return config
  }
  console.error("No config file")
  process.exit(1)
}
