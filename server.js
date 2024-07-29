const express=require('express')

const app=express();

const db=require('./db');
require('dotenv').config();

const bodyParser=require('body-parser');

const PORT=process.env.PORT||3000;

app.use(bodyParser.json());



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