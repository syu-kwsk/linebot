const path = require("path");
const express = require("express");
const line = require("@line/bot-sdk");

const lineConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};
const lineClient = new line.Client(lineConfig);

function createReplyMessage(input) {
  if(input.source.type === "follow"){
   input.source.type.text = "誰かにフォローされました";
  }
  else if(input.source.type === "unfollow"){
    input.source.type.text = "誰かにブロックされました";
  }
  else{
    input.source.type.text = "ブロックしてください";
  }


  return{
  type: text,
  text: input.message.text
  };
}

const server = express();

server.use("/images", express.static(path.join(__dirname, "images")));

server.post("/", line.middleware(lineConfig), (req, res) => {
  // LINEのサーバーに200を返す
  res.sendStatus(200);

  for (const event of req.body.events) {
    if (event.type === "source" ) {
     const message = createReplyMessage(event);
      lineClient.replyMessage(event.replyToken, message);
    }
  }
});

server.listen(process.env.PORT || 8080);
