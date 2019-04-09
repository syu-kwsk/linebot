const path = require("path");
const express = require("express");
const line = require("@line/bot-sdk");

const lineConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};
const lineClient = new line.Client(lineConfig);

function createReplyMessage(input) {

  input.type.type = "text";

  if(input.type === "follow"){
   input.type.text = "誰かにフォローされました";
  }
  else if(input.type === "unfollow"){
    input.type.text = "誰かにブロックされました";
  }
  else{
    input.type.text = "ブロックしてください";
  }

  return{
  type: input.type.type,
  text: input.type.text
  };
}
const server = express();

server.use("/images", express.static(path.join(__dirname, "images")));

server.post("/", line.middleware(lineConfig), (req, res) => {
  // LINEのサーバーに200を返す
  res.sendStatus(200);

  for (const event of req.body.events) {
    if (event.type === "follow" || event.type === "unfollow" || event.type === "message") {
     const message = createReplyMessage(event);
      lineClient.pushMessage(event.source.userId, message);
    }
  }
});

server.listen(process.env.PORT || 8080);
