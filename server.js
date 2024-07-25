const express=require('express')

const app=express();

const db=require('./db');

const bodyParser=require('body-parser');
app.use(bodyParser.json());



app.get('/',function(req,res){
    res.send('welcome to my home')
} )



const personRoutes=require('./routes/personroutes')
const menuRoutes=require('./routes/menuitem')



app.use('/person',personRoutes);

app.use('/menu',menuRoutes);

app.listen(3000,()=>{
    console.log('listening on port 3000')
})