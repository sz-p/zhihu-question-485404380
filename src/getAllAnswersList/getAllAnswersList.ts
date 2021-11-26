import { getConfig, sleep, getAnswerListFilePath, writeAnswerContentToFile } from "../utils/utils"
import Crawler from 'crawler';
import Logger from '../logger/logger';
import * as fs from 'fs';

const config = getConfig()
const { REQUEST_QUESTIONS_URL, TIME_TRY_AGAIN, QUESTION_ID } = config;
const { LoggerInfo, LoggerError, LoggerSuccess } = Logger;
const answerListFilePath = getAnswerListFilePath()

let offset = 0;
let isEnd = false;
let isError = false;

const onError = function (error: Error | string) {
  isError = true;
  console.log(error)
  LoggerError(`获取回答链接失败 当前已获取 ${offset} 个,${TIME_TRY_AGAIN / 1000 / 60}分钟后重试`)
  setTimeout(startGetAnswersList, TIME_TRY_AGAIN)
}
const onEnd = function (totals: number | string) {
  isEnd = true
  LoggerSuccess(`已获取全部回答 当前已获取 ${totals} 个,文件已保存至: ${answerListFilePath}`)
}
const onSuccess = function (totals: number, data: [{ url: string, content: string, id: number }]) {
  const answersList = []
  for (let i = 0; i < data.length; i++) {
    answersList.push(data[i].url)
    const content = data[i].content;
    const id = data[i].id
    writeAnswerContentToFile(`${id}.txt`, content)
  }
  if (!isEnd) {
    fs.writeFileSync(answerListFilePath, answersList.toString() + ',', { flag: "a+" })
    LoggerInfo(`正在获取全部回答链接： 总共${totals}个， 当前已获取 ${offset} 个`)
    offset += 20;
  }
  if (isEnd) {
    fs.writeFileSync(answerListFilePath, answersList.toString(), { flag: "a+" })
    LoggerInfo(`正在获取全部回答链接： 总共${totals}个， 当前已获取 ${totals} 个`)
  }
  if (!isError || !isEnd) {
    startGetAnswersList();
  }
}
const startGetAnswersList = function () {
  const rqu = REQUEST_QUESTIONS_URL.replace("offset=0", `offset=${offset}`).replace("485404380", `${QUESTION_ID}`)
  crawler.queue(rqu)
}
const crawler = new Crawler({
  maxConnections: 1,
  jQuery: false,
  callback: function (error, res, done) {
    if (error) {
      onError(error)
    }
    const resObj = JSON.parse(res.body as string)
    const is_end = resObj?.paging?.is_end
    const totals = resObj?.paging?.totals
    const data = resObj?.data
    if (!data.length) {
      if (offset > totals) {
        isEnd = true
        done();
      }
    }
    onSuccess(totals, data)
    if (is_end) {
      onEnd(totals)
    }
    done();
  }
});

const getAnswersList = async function (): Promise<boolean> {
  startGetAnswersList();
  return true;
}

export const getAllAnswersList = async function (): Promise<void> {
  getAnswersList()
  while (true) {
    await sleep(1000)
    if (isEnd) {
      break
    }
  }
  return
}
