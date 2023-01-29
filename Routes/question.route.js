const express = require("express");
const {Que} = require("../Modals/question.modal");

const QueRouter = express.Router();



QueRouter.get("/", async (req, res) => {
  let page = req.query.page || 1;
  

try{
  let data =await Que.aggregate(
    [ { $sample: { size: 10 } } ]
 ).limit(10)
// let data = await Que.find().limit(10);
  return res.status(200).send({ success: true,data });
}  
   catch (error) {
    return res.status(404).send({ error: error.message });
  }
});




QueRouter.post("/new", async (req, res) => {
  try {
    const { Quetion } = req.body;
    const getQue = await Que.findOne({Quetion });
    
    if (getQue) {
      return res.send({ message: "Quetion already exists" });
    }

    const Que = await Que.create(req.body);
 
    return res.status(201).send({ message: "Que suceesfully added",Que });
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
});

QueRouter.post("/check/:id",async(req,res)=>{
  let id = req.params.id;
  let ans = req.body.ans;
  
  try {
    let qus =await Que.findById({_id:id});
    
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


QueRouter.patch("/update/:id", async (req, res) => {
  
  try {

    const Que = await Que.findByIdAndUpdate(req.params.id,req.body);

    return res.status(200).send({ message: "updated succesfully",Que });
  } catch (error) {
    console.log(error)
    return res.send({ message: "Something went wrong" });
  }
});



//get users details
QueRouter.delete("/delete/:id", async (req, res) => {
  let id = req.params.id
  try {
    const Que = await Que.findByIdAndDelete(id);
    return res.status(200).send({ success: "deleted sucessfully"});
  } catch (error) {
    return res.status(404).send({ error: error.message });
  }
});



module.exports = {QueRouter};
