const path = require("path");
const express = require("express");
const line = require("@line/bot-sdk");

const lineConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};
const lineClient = new line.Client(lineConfig);

function createReplyMessage(input) {

  let message = "";

  if(input.type === "follow"){
   message = "誰かにフォローされました";
  }
  else if(input.type === "unfollow"){
    message = "誰かにブロックされました";
  }
  else{
    message = "ブロックしてください";
  }

  return{
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
    if (event.source.type === "userId") {
      const event_message = createReplyMessage(event);
      lineClient.pushMessage(event.source.userId, event_message);
    }
    else if(event.source.type == "groupId"){
      const event_message = createReplyMessage(event);
      lineClient.pushMessage(event.source.groupId, event_message);
    }
    // else{
    //   const event_message = createReplyMessage(event);
    //   lineClient.pushMessage(event.source.userId, event_message);
    // }
   
  }
});

server.listen(process.env.PORT || 8080);
