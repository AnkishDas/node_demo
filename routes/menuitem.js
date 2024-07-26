const express=require('express');
const router=express.Router();
const MenuItem=require('../models/MenuItem'); 

router.get('/',async(req,res)=>{
    try{
        const data=await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
} )

router.get('/:tastetype',async(req,res)=>{
    try{
        const tastetype = req.params.tastetype;
        if(tastetype=='sweet' || tastetype=='spicy'|| tastetype=='sour'){
            const response=await MenuItem.find({taste:tastetype});
            res.status(200).json(response)
            console.log('data fetched');
        }
        else{
            res.status(404).json({error:'Invalid work type'});
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'internal server error'})
    }
})

router.post('/',async(req,res)=>{
    try {
     const data = req.body;

     const newMenu = new MenuItem(data);
     const response = await newMenu.save();
     console.log('Data saved');
     res.status(200).json(response);
    } catch (error) {
     if (error.code === 11000) {
         // Duplicate key error
         res.status(400).json({ error: 'Duplicate key error: Email must be unique' });
     } else {
         console.log(error);
         res.status(500).json({ error: 'Internal server error' });
     }
    }
})

//this is for experiment perpous 


module.exports=router;