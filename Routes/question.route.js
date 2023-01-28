const express = require("express");

const quesRouter = express.Router();
const Ques = require("../Modals/question.modal.js");



quesRouter.get("/", async (req, res) => {
  let category = req.query.category; 
//   try {
//     let ques;
// if(category){
// ques = await Ques.find({category});
// }else{
//   ques  = await Ques.find();
// }
try{
  let ques =await Ques.find();
  return res.status(200).send({ success: true,ques });
}  
   catch (error) {
    return res.status(404).send({ error: error.message });
  }
});




quesRouter.post("/new", async (req, res) => {
  try {
    const { question } = req.body;
    const getQues = await Ques.findOne({question });
    
    if (getQues) {
      return res.send({ message: "Question already exists" });
    }

    const ques = await Ques.create(req.body);
 
    return res.status(201).send({ message: "Ques suceesfully added",ques });
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
});


quesRouter.patch("/update/:id", async (req, res) => {
  
  try {

    const ques = await Ques.findByIdAndUpdate(req.params.id,req.body);

    return res.status(200).send({ message: "updated succesfully",ques });
  } catch (error) {
    console.log(error)
    return res.send({ message: "Something went wrong" });
  }
});



//get users details
quesRouter.delete("/delete/:id", async (req, res) => {
  let id = req.params.id
  try {
    const ques = await Ques.findByIdAndDelete(id);
    return res.status(200).send({ success: "deleted sucessfully"});
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
});



module.exports = quesRouter;
