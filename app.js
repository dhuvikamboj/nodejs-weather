const yargs=require('yargs');
const geoCodeAddress=require('./geocode/promiseGeoCode.js')
const forecast=require('./forecast/promiseForecast.js')
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
geoCodeAddress.geoCode(argv.a).then((location)=>{
  console.log(JSON.stringify(location,undefined,2));

  return forecast.forecastLoc(location.latitude,location.longitude);
}).then((weather)=>{
    console.log("WEATHER:");
    console.log(JSON.stringify(weather,undefined,2));

}).catch((errorMessage)=>{
  console.log(errorMessage);

});
