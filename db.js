const mongoose=require('mongoose');

//const mongoURL='mongodb://localhost:27017/hotels'
require('dotenv').config();

const mongoURL=process.env.MONGODB_URL;

mongoose.connect(mongoURL)

const db=mongoose.connection;
db.on('connected',()=>{
    console.log('connected');
})
db.on('disconnected',()=>{
    console.log('disconnected');
})
db.on('error',()=>{
    console.log('error');
})

module.exports=db;