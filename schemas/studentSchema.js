const mongoose = require('mongoose');


let studentSchema = new mongoose.Schema(
    {
        studentID:{type:Number,required:true},
        studentName:{type:String,required:true},
        role:{type:String,required:true},
        batch:{type:String,required:true},
        course:{type:String,required:true},
        mentor:{type:String,required:true},
        previousMentor:{type:Array},
        createdAt:{type:Date,default:Date.now}
        },
    {
        versionKey:false
    }
)

let studentModel = mongoose.model('students', studentSchema);
module.exports={studentModel};