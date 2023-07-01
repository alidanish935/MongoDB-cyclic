const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const BookSchema = new Schema({
    title: {
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    }
})
const book = mongoose.model('Book',BookSchema)

module.exports =book