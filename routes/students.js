var express = require('express');
var router = express.Router();
const {studentModel} = require('../schemas/studentSchema');
const mongoose = require('mongoose');
const {dbUrl} = require('../common/dbConfig');
mongoose.connect(dbUrl);

/* GET ALL STUDENT DATA */
router.get('/', async function(req, res, next) {
  try{
    let students = await studentModel.find();
    res.status(200).send({
        students,
        message:"Student data fetched successfully"
    }
    )
  }
  catch (error){
    res.status(500).send({
      message:"Internal server error",
      error
  })
}
});

// GET STUDENT BY ID

router.get('/:studentID', async function(req, res, next) {
    try{
      let studentID = await studentModel.findOne({studentID:req.params.studentID});
      res.status(200).send({
        studentID,
        message:"Student data for the ID fetched successfully"
      }
      )
    }
    catch (error){
      res.status(404).send({
        message:"There is no data available for this ID",
        error
    })
  }
  });

// ADD NEW STUDENT DATA

router.post('/addstudent',async(req, res)=>{
    try{
      let student = await studentModel.findOne({studentID:req.body.studentID});

      if(!student){
      let student = await studentModel.create(req.body);
      res.status(200).send({
        message:"Student added successfully"
      })
    }else{
        res.status(400).send({
            message:"Student already exist!"
          })
    }
    }
    catch (error){
      res.status(500).send({
        message:"Internal server error",
        error
    })
  }
  });


// DELETE STUDENT

router.delete('/:studentID',async(req, res)=>{
    try{
      let student = await studentModel.findOne({studentID:req.params.studentID});

      if(student){
      let student = await studentModel.deleteOne({studentID:req.params.studentID});
      res.status(200).send({
        message:"Student deleted successfully"
      })
    }else{
        res.status(400).send({
            message:"There is no data available for this ID"
          })
    }
    }
    catch (error){
      res.status(500).send({
        message:"Internal server error",
        error
    })
  }
  });


// UPDATE STUDENT DATA

router.put('/:studentID',async(req, res)=>{
    try{
      let student = await studentModel.findOne({studentID:req.params.studentID});

      if(student){
        student.studentID = req.body.studentID;
        student.studentName= req.body.studentName;
        student.role= req.body.role;
        student.batch= req.body.batch;
        student.course= req.body.course;
        student.mentor= req.body.mentor;

        await student.save()

      res.status(200).send({
        message:"Student data updated successfully"
      })
    }else{
        res.status(400).send({
            message:"There is no data available for this ID"
          })
    }
    }
    catch (error){
      res.status(500).send({
        message:"Internal server error",
        error
    })
  }
  });

  // UPDATE OR CHANGE MENTOR 


  router.put('/changementor/:studentID',async(req, res)=>{
    try{
      let student = await studentModel.findOne({studentID:req.params.studentID});

      if(student){
        student.previousMentor = student.mentor;
        student.mentor= req.body.mentor;
        await student.save()

      res.status(200).send({
        message:"Mentor updated successfully"
      })
    }else{
        res.status(400).send({
            message:"There is no data available for this ID"
          })
    }
    }
    catch (error){
      res.status(500).send({
        message:"Internal server error",
        error
    })
  }
  });

  // PREVIOUS MENTOR FOR A STUDENT

  router.get('/previousmentor/:studentID', async function(req, res, next) {
    try{
      let studentID = await studentModel.findOne({studentID:req.params.studentID});
      let previousMentor = studentID.previousMentor;
      res.status(200).send({
        previousMentor,
        message:"Previous mentor for this student fetched successfully"
      }
      )
    }
    catch (error){
      res.status(404).send({
        message:"There is no data available for this ID",
        error
    })
  }
  });








module.exports = router;