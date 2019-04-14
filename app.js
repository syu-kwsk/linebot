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
  let hands = ["グー", "チョキ", "パー"];

  if (hands.indexOf(input) == -1){
    message = "グーかチョキかパーを入力してね";
  } else {
    let x = Math.random();
    let botHandNum = Math.floor(3 * x);
    let userHandNum = hands.indexOf(input);
    let judge = (userHandNum - botHandNum + 3) % 3;

    if (judge == 2) {
      message = `私は${hands[botHandNum]}です。あなたの勝ちです。`;
    } else if (judge == 1) {
      message = `私は${hands[botHandNum]}です。あなたの負けです。`;
    } else {
      message = `私も${hands[botHandNum]}です。あいこです。`
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