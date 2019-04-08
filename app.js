const path = require("path");
const express = require("express");
const line = require("@line/bot-sdk");

const lineConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};
const lineClient = new line.Client(lineConfig);


function createReply() {

  
   return {
    type: "sticker",
    packageid: '1',
    stickerid: '1'
  };
}


const server = express();

server.use("/images", express.static(path.join(__dirname, "images")));

server.post("/", line.middleware(lineConfig), (req, res) => {
  // LINEのサーバーに200を返す
  res.sendStatus(200);

  lineClient.replyMessage(req.body.events[0].replyToken, createReply());

  // for (const event of req.body.events) {
  //   if (event.type === "message" && event.message.type === "text") {
  //     const message = createReply(event.message.text);
  //     lineClient.replyMessage(event.replyToken, message);
  //   }
  // }

      
});

server.listen(process.env.PORT || 8080);
