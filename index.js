const http = require("http");
const fs = require("fs");
const requests = require("requests");
const homeFile = fs.readFileSync("./home.html",'utf-8');

const server = http.createServer((req,res) => {
    if(req.url == "/") {
        requests("https://api.openweathermap.org/data/2.5/weather?q=Kolkata&appid=2c29bba0be59b9591bd9795931bade2a", { streaming })
        .on('data',  (chunk) => {
            const objdata = json.parse(chunk);
          console.log(objdata);
        })
        .on('end',  (err) => {
          if (err) return console.log('connection closed due to errors', err);
         
          console.log('end');
        }); 
    }
});
server.listen(8000,"127.0.0.1");