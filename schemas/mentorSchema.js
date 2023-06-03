const mongoose = require('mongoose');


let mentorSchema = new mongoose.Schema(
    {
        mentorID:{type:Number,required:true},
        mentorName:{type:String,required:true},
        role:{type:String,required:true},
        batch:{type:String,required:true},
        course:{type:String,required:true},
        students:{type:Array,required:true},
        createdAt:{type:Date,default:Date.now}
        },
    {
        versionKey:false
    }
)

let mentorModel = mongoose.model('mentors', mentorSchema);
module.exports={mentorModel};