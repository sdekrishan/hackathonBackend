const mongoose = require("mongoose");

const QuoteSchema = mongoose.Schema({
    quote:String,
    author:String
})

const QuoteModel = mongoose.model("quote",QuoteSchema);

module.exports={QuoteModel};