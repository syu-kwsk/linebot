const express = require("express");
const line    = require("@line/bot-sdk");
const pg      = require("pg");
const config  = require("./config.json");

const pool = new pg.Pool(config.db.postgres);

const lineConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret:      process.env.LINE_CHANNEL_SECRET
};

const lineClient = new line.Client(lineConfig);
const server     = express();


function createReplyMessage(input) {
　

  let currentNum;
  let currentTurn;  
  
    return messages;
}



server.post("/webhook", line.middleware(lineConfig), (req, res) => {
  // LINEのサーバーに200を返す
  res.sendStatus(200);
  for (const event of req.body.events) {
    if (event.source.type == "user" && event.type == "message" && event.message.type == "text") {
      pool.connect((err, client, done) => {
        const query = "SELECT * FROM talk WHERE user_id = '"+event.source.userId+"';";
        client.query(query, (err, result) => {
          done();
          for (const row of result.rows) {
           currentTurn  = row.currentTurn;
           currentNum = row.currentNum;
          }
          const messages = [];
          function make_message(str){

            return {
              type: "text",
              text: str
            };
        }

          let question = ["dog", "cat", "bird"];
          let answer   = ["犬", "猫", "鳥"];

          if(currentTurn == "question" || currentTurn == "answer"){  

            if(currentTurn == "question"){
              masseges.push(make_message(question[currentNum]));
              currentTurn = "answer"; //データベース
            }
            else if(currentTurn == "answer"){
              messages.push(make_message("answer is " + answer[currentNum]));
          
              if(question[currentNum] == answer[currentNum]){
                messages.push(make_message("correct"));
              }
              else{
                messages.push(make_message("wrong"));
              }
              currentNum = currentNum + 1;
              currentTurn = "qusetion";
            }
          }
          else{
            messages.push(make_message("let's word"));
            messages.push(make_message(question[0]));
            currentNum = 0;
            currentTurn = "answer";
          
           }
          





        });
      });
      
   
   
   
   
    }
  }
  
  
});

server.listen(process.env.PORT || 8080);
