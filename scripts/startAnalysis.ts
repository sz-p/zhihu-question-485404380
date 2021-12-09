import * as fs from 'fs';
import * as path from 'path';
import { load, cut } from '@node-rs/jieba'
import Logger from '../src/logger/logger';
const { LoggerSuccess } = Logger;

import { getAnswerContentTextDirPath, getCityNameHash, writeTextToCityCountFile, getCityCountFilePath } from "../src/utils/utils"

const answerContentTextDirPath = getAnswerContentTextDirPath()

const answerContentTextList = fs.readdirSync(answerContentTextDirPath)

const cityCount = {} as { [key: string]: number }

const cityNameHash = getCityNameHash();

const addCityCount = function (cityName: string) {
  if (cityCount[cityName]) {
    cityCount[cityName]++
  } else {
    cityCount[cityName] = 1
  }
}

const cityNameFilter = function (srt: string) {
  if (cityNameHash[srt]) {
    if (srt.includes("市")) {
      addCityCount(srt.replace("市", ''))
    } else {
      addCityCount(srt)
    }
  }
}
const checkEnd = function (now: number, totals: number) {
  if (now === totals) {
    const cityCountFilePath = getCityCountFilePath()
    writeTextToCityCountFile(JSON.stringify(cityCount))
    LoggerSuccess(`已统计全部回答中的城市信息，文件已保存在${cityCountFilePath}.`)
    process.exit(0)
  }
}
let processedCount = 0
load();
for (let i = 0; i < answerContentTextList.length; i++) {
  const answerContentTextPath = path.resolve(answerContentTextDirPath, answerContentTextList[i])
  fs.readFile(answerContentTextPath, (err, data) => {
    processedCount++;
    if (err) return
    let contentText = data.toString();
    // 去除非中文符号
    contentText = contentText.replace(/[^\u4E00-\u9FA5]/g, '')
    const contentTextSplit: any = cut(contentText, false);
    contentTextSplit.filter(cityNameFilter)
    checkEnd(processedCount, answerContentTextList.length)
  })
}
