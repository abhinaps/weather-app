const express = require("express")
const https = require("https")
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){

const url = "https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=8a3e820fa0ae2d3eb8b89452ebc5591d&units=metric"

https.get(url,function(response){
  console.log(response.statusCode);

  response.on("data",function(data){
    const weatherdata = JSON.parse(data);
    const temp = weatherdata.main.temp;
    const des = weatherdata.weather[0].description;
    const icon = weatherdata.weather[0].icon;
    const imgurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    res.write("<h1>The Temp in Delhi is " + temp + " degree celcius</h1>");
    res.write("<h3>the weather is " + des +".</h3>");
    res.write("<img src=" + imgurl + " alt=image>" );
    res.send();
  })
})
})

app.get("/bycity",function(req,res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/bycity", function(req,res){
  const city = req.body.city
  const urll = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=8a3e820fa0ae2d3eb8b89452ebc5591d&units=metric"

https.get(urll, function(response){

  response.on("data",function(data){
    const weatherdata = JSON.parse(data);
    const temp = weatherdata.main.temp;
    const des = weatherdata.weather[0].description;
    const icon = weatherdata.weather[0].icon;
    const imgurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    res.write("<h1>The Temp in "+ city +" is " + temp + " degree celcius</h1>");
    res.write("<h3>the weather is " + des +".</h3>");
    res.write("<img src=" + imgurl + " alt=image>" );
    res.send();
  })
})
})

app.listen("3000", function(){
  console.log("server is running at port 3000");
})
