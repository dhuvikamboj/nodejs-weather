const request=require('request');
var geoCode=(address,callback)=>{
  var encodedAddress=encodeURIComponent(address);
  request({
    url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json:true
  },(error,response,body)=>{
    if(error){
      callback("Can't connect to Google Maps API");
    }else if (body.status==='ZERO_RESULTS') {
      callback()("No Results Found");
    }else if (body.status==='OK') {
      callback(undefined,{
        address:body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude:body.results[0].geometry.location.lng
      })

    } else {
      callback(`ERROR: ${body.status}`);
    }
  });
}

module.exports={
  geoCode
}
