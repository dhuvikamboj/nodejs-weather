const request=require('request');
var geoCode=(address)=>{
  return new Promise((resolve,reject)=>{
    var encodedAddress=encodeURIComponent(address);
    request({
      url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
      json:true
    },(error,response,body)=>{
      if(error){
        reject("Can't connect to Google Maps API");
      }else if (body.status==='ZERO_RESULTS') {
        reject("No Results Found");
      }else if (body.status==='OK') {
        resolve({
          address:body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude:body.results[0].geometry.location.lng
        });

      } else {
        reject(`ERROR: ${body.status}`);
      }
    });
  });

  }

module.exports={
  geoCode
}
