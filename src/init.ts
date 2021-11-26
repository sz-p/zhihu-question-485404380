import { getConfig, createNotExistsDirInDownloadDir } from "./utils/utils"
import Logger from './logger/logger';
import * as packageJson from "../package.json";
const { LoggerInfo, LoggerError } = Logger;

export const init = function (): false | {
  [key: string]: any
} {
  const config = getConfig()
  const { TIME_CD, TIME_CD_RANDOM, QUESTION_ID } = config
  createNotExistsDirInDownloadDir(QUESTION_ID)
  LoggerInfo(`${packageJson.name} running !`)
  return {
    PACKAGE_NAME: packageJson.name,
    TIME_CD,
    TIME_CD_RANDOM,
  }
}
