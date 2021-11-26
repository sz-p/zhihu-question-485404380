const download = require('image-downloader');
export const imgDownloader = async function (imgURL: string, imgPath: string): Promise<false | string> {
  return download.image({ url: imgURL, dest: imgPath }).then((d: { filename: string }) => {
    return d.filename;
  }).catch(() => {
    return false;
  });
}
