const m3u8ToMp4 = require('m3u8-to-mp4');
const converter = new m3u8ToMp4();
// need ffmpeg
export default function (url: string, filePath: string) {
  converter.setInputFile(url).setOutputFile(filePath).start();
}
