FROM  alishahbaz111/ffmpeg-nodejs-yarn-npm:ffmpeg-with-nodejs-yarn-npm

RUN mkdir -p /node-spider-crawler-starter
WORKDIR /node-spider-crawler-starter
COPY ./dist /node-spider-crawler-starter
COPY ./dist/configs /configs
COPY ./dist/download /download
COPY ./dist/logs /logs

CMD ["npm","run","start"]
