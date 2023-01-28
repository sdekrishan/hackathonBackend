const express = require("express");
const { QuoteModel } = require("../Modals/Quote.model");

const QuoteRouter = express.Router();

QuoteRouter.get("/",async(req,res)=>{
    try {
        let data = await QuoteModel.aggregate(
            [ { $sample: { size: 10 } } ]
         ).limit(10);
        res.status(200).send({msg:"success",data})
    } catch (error) {
        res.status(400).send({msg:"oops something went wrong",error})
    }
})




module.exports = {QuoteRouter}