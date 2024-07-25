const express=require('express');
const router=express.Router();
const Person=require('../models/person'); 


router.post('/',async(req,res)=>{
    try {
     const data = req.body;
 
     // Validate that email is provided
     if (!data.email) {
         return res.status(400).json({ error: 'Email is required' });
     }
 
     const newPerson = new Person(data);
     const response = await newPerson.save();
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

 router.get('/',async(req,res)=>{
    try{
        const data=await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
} )

router.get('/:workType',async(req,res)=>{
    try{
        const workType = req.params.workType;
        if(workType=='chef' || workType=='maneger'|| workType=='waiter'){
            const response=await Person.find({work:workType});
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

router.put('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const updatePersondata=req.body;

        // const response=await Person.findOneAndUpdate(personId,updatePersondata,{
        //     new: true,
        //     runValidators:true,
        // })
        const response = await Person.findOneAndUpdate({ _id: personId }, updatePersondata, { new: true , runValidators:true});

        if(!response){
            
           
       return res.status(404).json({error:'person not found'});

        }
        console.log('data feched');
        res.status(200).json(response);
       
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:'internal server error'})

    }
})
router.delete('/:id',async(req,res)=>{
    try{
    const personId=req.params.id;
    const response=await Person.findByIdAndDelete(personId)
    if(!response){
        return res.status(404).json({error:'person not found'});

    }
    console.log('data deleted')
    res.status(200).json({message:'person deleted successfully'});
}
catch(error){
    console.log(error)
    res.status(500).json({error:'internal server error'});
}
})

// router.delete('/:id', async (req, res) => {
//     try {
//         const personId = req.params.id;
//         const response = await Person.findByIdAndDelete(personId);
//         if (!response) {
//             return res.status(404).json({ error: 'Person not found' });
//         }
//         console.log('Data deleted');
//         res.status(200).json({ message: 'Person deleted successfully' });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

module.exports=router;