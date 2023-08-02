import mongoose from "mongoose";


const quoteSchema = mongoose.Schema({
    "quote": {
        type: String,
        require: true
    },
    "author":{
        type: String,
        require: true
    }
}, {timestamps: true})

export const Quote = mongoose.model('Quote', quoteSchema)