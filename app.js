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
　　text = "誰かに追加されました。";
    messages.push(message(text));
  }
  else if(input.type === "unfollow"){
    message("誰かにブロックされました");
  }
 
  

  messages.push(message(text));
  
  return messages;
}

const server = express();

server.use("/images", express.static(path.join(__dirname, "images")));

server.post("/", line.middleware(lineConfig), (req, res) => {
  // LINEのサーバーに200を返す
  res.sendStatus(200);

  for (const event of req.body.events) {
    if (event.type === "source") {
      const message = createReplyMessage(event.source);
      lineClient.replyMessage(event.replyToken, message);
    }
  }
});

server.listen(process.env.PORT || 8080);
