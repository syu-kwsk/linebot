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
  let status;
  const messages = [];


  function make_message(str){
    return{
      type: "text",
      text: str
    };
  }
   
  if(input.indexOf("健康") === -1 && input.indexOf("m") === -1 && input.indexOf("kg") === -1){
    text = "健康に興味ありませんか？BMIを測ります。";
    messages.push(make_message(text));
    text = "「身長」mと「体重」kgをこの順で入力してください。単位を半角英数字で忘れないようにしてください！";
    messages.push(make_message(text));
  }
  else{
    if(input.indexOf("m") > input.indexOf("kg")){
      text = "!!warning!!\n順番が逆です";
      messages.push(make_message(text));
      status = "warning"
    }
    if(input.indexOf("m") === -1 || input.indexOf("kg") === -1){
      text = "!!warning!!\n要素が抜けています。やり直し！";
      messages.push(make_message(text));
      status = "warning"
    }

    else if(status != "warning"){
      const m_pos = input.indexOf("m") + 1;
      const kg_pos = input.indexOf("kg") + 1;

      let length_data = input.slice(0, m_pos);
      let weigth_data = input.slice(m_pos, kg_pos);

    
      
      let length = parseInt(length_data);
      let weight = parseInt(weigth_data);
  


      text = `身長は${length},体重は${weight}`;
      messages.push(make_message(text));
    }

  }

  



  return messages;
}
const server = express();

server.use("/images", express.static(path.join(__dirname, "images")));

server.post("/webhook", line.middleware(lineConfig), (req, res) => {
  // LINEのサーバーに200を返す
  res.sendStatus(200);

  for (const event of req.body.events) {
    if (event.type === "message") {
      const message = createReplyMessage(event.message.text);
      lineClient.replyMessage(event.replyToken, message);
    }
  }
});

server.listen(process.env.PORT || 8080);
