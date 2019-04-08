const path = require("path");
const express = require("express");
const line = require("@line/bot-sdk");

const lineConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};
const lineClient = new line.Client(lineConfig);

function createReplyMessage(input) {

  let text = "";
  let messages = [];

  function message(str) {
    return {
      type: "text",
      text: str
    }
  }
  if(input.type === "follow"){
　  text = "誰かにフォローされました。";
    messages.push(message(text));
  }
  else if(input.type === "unfollow"){
  　text = "誰かにブロックされました。";
  　messages.push(message(text));
  }

  return messages;
}

const server = express();

server.use("/images", express.static(path.join(__dirname, "images")));

server.post("/", line.middleware(lineConfig), (req, res) => {
  // LINEのサーバーに200を返す
  res.sendStatus(200);

  const message = createReplyMessage(req.body.events[0].source);
  lineClient.replyMessage(req.body.events[0].replyToken, source);
  
});

server.listen(process.env.PORT || 8080);
