const yargs=require('yargs');
const geoCodeAddress=require('./geocode/geocodeAddress.js')
const forecast=require('./forecast/forecast.js')
const argv=yargs
.options({
a:{
  demand:true,
  alias:'address',
  describe:'Address to fetch weather',
  string:true
}
}).help()
.alias('help','h')
.argv;
geoCodeAddress.geoCode(argv.a,(error,result)=>{
  if (error) {
    console.log(error);

  } else {
console.log(JSON.stringify(result,undefined,2));
console.log("WEATHER:");
forecast.forecastLoc(result.latitude,result.longitude,(errorWeather,resultWeather)=>{
  if (errorWeather) {
    console.log(errorWeather);
  } else {
    console.log(JSON.stringify(resultWeather,undefined,2));
  }
})

  }
});
