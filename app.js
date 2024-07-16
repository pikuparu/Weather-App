require('dotenv').config();
var express=require("express");

const https=require("https");
var bodyParser=require("body-parser");
var app=express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(request,response){
   
 response.sendFile(__dirname + "/index.html");

});


app.post("/",function(request,response){
   const query=request.body.cityName;
const apiKey=process.env.OPENWEATHER_API_KEY;

const unit="metric";
const url ="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey+"&units="+ unit;
  https.get(url,function(res){
     
   res.on("data",function(data){
       var weatherData=JSON.parse(data);
     const temp=weatherData.main.temp;
     const description=weatherData.weather[0].description;
     const icon=weatherData.weather[0].icon; 
     const imgeURL = "https://openweathermap.org/img/wn/"+icon+ "@2x.png";
     const myimg="images/weather_1";

response.render('result', {temp: temp,icon:imgeURL,description:description});

})
})

});


app.listen(process.env.PORT || 3000,function(){
    console.log("Server started at port 3000");

});

