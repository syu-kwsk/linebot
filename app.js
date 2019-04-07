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
    text: ans
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

  
  for (const event1 of req.body.events) {
    if (event1.type === "message" && event1.message.type === "text") {
      const message1 = createReply(event1.message.text);
      lineClient.replyMessage(event1.replyToken, message1);
    }
  }

  for (const event2 of req.body.events) {
    if (event2.type === "message" && event2.message.type === "text") {
      const message2 = ahi(event2.message.text);
      lineClient.replyMessage(event2.replyToken, message2);
    }
  }
  
      
});

server.listen(process.env.PORT || 8080);
