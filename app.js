const path = require("path");
const express = require("express");
const line = require("@line/bot-sdk");

const lineConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET
};
const lineClient = new line.Client(lineConfig);

function createReplyMessage(input) {

  let text;
  const messages = [];


  function make_message(str){
    return{
      type: text,
      text: str
    };
  }
   
if(input.indexOf("健康") === -1){
  text = "健康に興味ありませんか？\nBMIを測ります。";
  messages.push(make_message(text));
  text = " 「身長」mと「体重」kgを入力してください。\n単位を半角英数字で忘れないようにしてください！";
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
    if (event.type === "message" && event.message.type === "text") {
    　const event_message = createReplyMessage(event.message.text);
      lineClient.pushMessage(event.source.userId, event_message);
    }
    
   
  }
});

server.listen(process.env.PORT || 8080);
