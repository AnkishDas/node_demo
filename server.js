const express=require('express')
const app=express();
const db=require('./db');
require('dotenv').config();
const passport=require('./auth');

const bodyParser=require('body-parser');
const PORT=process.env.PORT||3000;

app.use(bodyParser.json());

const logRequest=(req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}]Request Made to : ${req.originalUrl}`);
    next();
}
app.use(logRequest);


app.use(passport.initialize());

const localAuthMiddleware=passport.authenticate('local',{session:false})

app.get('/',function(req,res){
    res.send('welcome to my home')
} )



const personRoutes=require('./routes/personroutes')
const menuRoutes=require('./routes/menuitem')



app.use('/person',personRoutes);

app.use('/menu',menuRoutes);


app.listen(PORT,()=>{
    console.log('listening on port 3000')
})