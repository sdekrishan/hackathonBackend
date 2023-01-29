const express = require("express");

const quesRouter = express.Router();
const Ques = require("../Modals/question.modal");



quesRouter.get("/", async (req, res) => {

try{
  let ques =await Ques.aggregate(
    [ { $sample: { size: 10 } } ]
 ).limit(10);
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

quesRouter.post("/check/:id",async(req,res)=>{
  let id = req.params.id;
  let ans = req.body.ans;
  
  try {
    let qus =await Ques.findById({_id:id});
    
    if(qus.ans === ans){
      res.send({your:"correct",mine:qus.ans})
    }
    else{
      res.send({your:"wrong",mine:qus.ans})
    }
  } catch (error) {
    res.send(error)
  }
})


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
