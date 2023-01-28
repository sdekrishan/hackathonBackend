const mongoose= require('mongoose');

const ProblemSchema= mongoose.createSchema({
            userID:{
                type: mongoose.Types.ObjectId,
                ref:''
            },
            problemID:[
                {type: mongoose.Types.ObjectId,
                ref:''}         
                      ]
})
const problemModel = mongoose.createModel("problemAttempted", ProblemSchema)
module.exports = problemModel