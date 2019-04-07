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
  else if((input.indexOf("定食")　=== -1)){
    ans = 'ahi';
  }
  

  
   return {
    type: "text",
    text: ans
  };
}


const server = express();

server.use("/images", express.static(path.join(__dirname, "images")));

server.post("/", line.middleware(lineConfig), (req, res) => {
  // LINEのサーバーに200を返す
  res.sendStatus(200);

  const message = createReply(req.body.events.message.text);
  lineClient.replyMessage(req.body.events.replyToken, message);

  
  // for (const event of req.body.events) {
  //   if (event.type === "message" && event.message.type === "text") {
  //     const message = createReply(event.message.text);
  //     lineClient.replyMessage(event.replyToken, message);
  //   }
  // }

      
});

server.listen(process.env.PORT || 8080);
