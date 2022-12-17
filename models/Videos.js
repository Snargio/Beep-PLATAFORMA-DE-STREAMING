const mongoose = require('mongoose')

const videosSchema = mongoose.Schema({
    URl: { type: String, required: true, minlength:5 },
    Title: { type: String, required: true, minlength:5 },
    Description: { type:String, required: true, minlength:5, maxlength:300 },
    Tag: {type:String, required:true},
    createdAt: { type: Date, default: Date.now } 
})


module.exports = mongoose.model('video', videosSchema)