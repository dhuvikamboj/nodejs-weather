const request=require('request');
var forecastLoc=(latitude,longitude,callback)=>{

  request({
    url:`https://api.darksky.net/forecast/2b621b1fa7d2c61d56538b424a77c520/${latitude},${longitude}`,
    json:true
  },(error,response,body)=>{
    if(error){
      callback("Can't connect to forecast.io API");
    }
     else {
       callback(undefined,{
         summary: body.currently.summary,
         temperature:body.currently.temperature
       })
    }
  });
}

module.exports={
  forecastLoc
}
