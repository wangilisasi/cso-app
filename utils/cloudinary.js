const cloudinary=require("cloudinary").v2;

cloudinary.config({
    cloud_name: "wangilisasi",
    api_key: "647743781872877",
    api_secret: "8CXjUTC9D2x_CZfybFimVZcEuWc"
});

module.exports=cloudinary;