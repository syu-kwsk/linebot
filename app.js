const path = require("path");
const express = require("express");
const line = require("@line/bot-sdk");

const lineConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};
const lineClient = new line.Client(lineConfig);

function createReply(input) {

  let ans;
  if(!(input.indexOf("定食") === -1)){
    ans = '定食ですね？何曜日ですか？';
  }
  

  
   return {
    type: "text",
    text: events.user
  };
}

function ahi(input){
  return{
    type: "text",
    text: "ahi"
  };
}

const server = express();

server.use("/images", express.static(path.join(__dirname, "images")));

server.post("/", line.middleware(lineConfig), (req, res) => {
  // LINEのサーバーに200を返す
  res.sendStatus(200);

  
  for (const event of req.body.events) {
    if (event.type === "message" && event.message.type === "text") {
      const message1 = ahi(event.message.text);
      const message2 = createReply(event.message.text);
      lineClient.replyMessage(event.replyToken, message1);
      lineClient.replyMessage(event.replyToken, message2);
    }
  }
});

server.listen(process.env.PORT || 8080);
