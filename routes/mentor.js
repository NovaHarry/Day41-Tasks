var express = require('express');
var router = express.Router();
const {mentorModel} = require('../schemas/mentorSchema');
const mongoose = require('mongoose');
const {dbUrl} = require('../common/dbConfig');
mongoose.connect(dbUrl);

/* GET ALL MENTOR DATA */
router.get('/', async function(req, res, next) {
  try{
    let mentors = await mentorModel.find();
    res.status(200).send({
        students,
        message:"Mentor data fetched successfully"
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

// GET MENTOR BY ID

router.get('/:mentorID', async function(req, res, next) {
    try{
      let mentorID = await mentorModel.findOne({mentorID:req.params.mentorID});
      res.status(200).send({
        mentorID,
        message:"Mentor data for the ID fetched successfully"
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

// ADD NEW MENTOR DATA

router.post('/addmentor',async(req, res)=>{
    try{
      let mentor = await mentorModel.findOne({mentorID:req.body.mentorID});

      if(!mentor){
      let mentor = await mentorModel.create(req.body);
      res.status(200).send({
        message:"Mentor added successfully"
      })
    }else{
        res.status(400).send({
            message:"Mentor already exist!"
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

router.delete('/:mentorID',async(req, res)=>{
    try{
      let mentor = await mentorModel.findOne({mentorID:req.params.mentorID});

      if(mentor){
      let mentor = await mentorModel.deleteOne({mentorID:req.params.mentorID});
      res.status(200).send({
        message:"Mentor deleted successfully"
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


// UPDATE DATA

router.put('/:mentorID',async(req, res)=>{
    try{
      let mentor = await mentorModel.findOne({mentorID:req.params.mentorID});

      if(mentor){
        mentor.mentorID = req.body.mentorID;
        mentor.mentorName= req.body.mentorName;
        mentor.role= req.body.role;
        mentor.batch= req.body.batch;
        mentor.course= req.body.course;
        mentor.students= req.body.students;

        await mentor.save()
        
      res.status(200).send({
        message:"Mentor data updated successfully"
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

  // GET ALL STUDENTS FOR A MENTOR

  router.get('/studentsformentor/:mentorID', async function(req, res) {
    try{
      let mentor = await mentorModel.findOne({mentorID:req.params.mentorID});
      let studentsForMentor = mentor.students;
      
      res.status(200).send({
        studentsForMentor,
        message:"Mentor data for the ID fetched successfully"
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