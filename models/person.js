const { uniq } = require('lodash');
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','maneger'],
        required:true
    },
    mobile:{
        type:String,
        requered:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }

});

personSchema.pre('save' ,async function(next) {
    const person=this;
    if(!person.isModified('password')) return next();

    try {
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(person.password,salt);
        person.password=hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
})

personSchema.methods.comparePassword=async function(candidatePassword){
    try {
        const isMatch=await bcrypt.compare(candidatePassword,this.password);
        return isMatch
    } catch (error) {
        throw error;
    }
}

const person =mongoose.model('person',personSchema);
module.exports=person;

