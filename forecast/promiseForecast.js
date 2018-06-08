const request=require('request');
var forecastLoc=(latitude,longitude)=>{
return new Promise((resolve,reject)=>{
  request({
    url:`https://api.darksky.net/forecast/2b621b1fa7d2c61d56538b424a77c520/${latitude},${longitude}`,
    json:true
  },(error,response,body)=>{
    if(error){
      reject("Can't connect to forecast.io API");
    }
     else if (response.statusCode===200) {
  
        resolve({
          summary: body.currently.summary,
         temperature:body.currently.temperature
       });
     } else if (response.statusCode===400) {
       reject("Could not fetch weather")
     }
  });
});

}

module.exports={
  forecastLoc
}
