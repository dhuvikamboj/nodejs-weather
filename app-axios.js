const yargs=require('yargs');
const axios=require('axios')
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
  var encodedAddress=encodeURIComponent(argv.a);
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`).then((response)=>{


    if(response.data.status==='ZERO_RESULTS'){
      throw new Error('No Results for this location');
    }else if (response.data.status==='OK') {
      var gaddress=response.data.results[0].formatted_address;
      var glatitude=response.data.results[0].geometry.location.lat;
      var glongitude=response.data.results[0].geometry.location.lng;
    console.log(`--------------------`);
    console.log(`------Location:-----`);
    console.log(`--------------------`);
    console.log(`Address:`,gaddress);
    console.log(`latitude:`, glatitude);
    console.log(`longitude`,glongitude);
    return axios.get(`https://api.darksky.net/forecast/2b621b1fa7d2c61d56538b424a77c520/${glatitude},${glongitude}`)
    }else{
    throw new Error(`ERROR: ${response.data.status}`);
    }
  }).then((response)=>{
    console.log(`--------------------`);
    console.log(`-------WEATHER:-----`);
    console.log(`--------------------`);
  //  console.log(response);
 if (response.status===200) {

       console.log(JSON.stringify({
         summary: response.data.currently.summary,
        temperature:response.data.currently.temperature
      },undefined,2));

  }else if (response.statusCode===400) {
    throw new Error("Could not fetch weather");
  }
}).catch((e)=>{
  if (e.code==="ENOTFOUND") {
    console.log("Could not connect to servers");
  }else{
    console.log(e.message);
  }

  })
