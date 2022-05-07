import mongoose from "mongoose";

const url = process.env.MONGO_URI;

mongoose.connect(url, {
    
}).then((db => console.log('database connected')))
    .catch(err => console.log(err ))