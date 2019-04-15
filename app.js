const path = require("path");
const express = require("express");
const line = require("@line/bot-sdk");

const lineConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};
const lineClient = new line.Client(lineConfig);

function createReplyMessage(input) {
  let message;
  let hands = ["グー","チョキ","パー"];//0はグー,1はチョキ,2はパー

  if(hands.indexOf(input) == -1){
    message = "グーかチョキかパーを入れてね";//グーもチョキもパーもなかった
  }
  else{
    let x = Math.random();　　　　　　 //xは0から1の間
    let botHandNum = Math.floor(3*x); //botHandNumは0,1,2のどれか
    let userHandNum = hands.indexOf(input);
    let judge;
    judge = (userHandNum - botHandNum + 3) % 3;

    if(judge == 2){
      message = "私の手は" + hands[botHandNum] + "です。あなたの勝ちです。";
    }
    else if(judge == 1){
      message = "私の手は" + hands[botHandNum] + "です。あなたの負けです。";
    }
    else if(judge == 0){
      message = "私の手は" + hands[botHandNum] + "です。あいこです。";
    }
  }

  return {
    type: "text",
    text: message
  };
}

const server = express();

server.use("/images", express.static(path.join(__dirname, "images")));

server.post("/webhook", line.middleware(lineConfig), (req, res) => {
  // LINEのサーバーに200を返す
  res.sendStatus(200);

  for (const event of req.body.events) {
    if (event.type === "message" && event.message.type === "text") {
      const message = createReplyMessage(event.message.text);
      lineClient.replyMessage(event.replyToken, message);
    }
  }
});

server.listen(process.env.PORT || 8080);