import mongoose from "mongoose";
import {Quote} from "../models/quote.js";
import {User} from "../models/user.js";

export const insertQuotesList = async (req, res) => {
    try {
        const quotes = req.body.quotes;
        for(let q of quotes){
            let quote = new Quote({
                quote: q.quote,
                author: q.author
            });
            await quote.save()
        }
        res.status(200).json({message: "QUOTES INSERTED SUCCESSFULLY"})
    }catch (error) {
        res.status(404).json({message: error.message})
    }
    const quotes = req.body

}



export const getAllQuotes = async (req, res) => {
    try{
        const quotes = await User.find()
        res.status(200).json({message: "OK", code: 200, data: quotes})
    }catch (error) {
        res.status(404).json({message: error.message})
    }
}


export const getRandomQuote = async  (req, res) => {
    try {
        const quotesCount = await Quote.countDocuments()
        const random = Math.floor(Math.random() * quotesCount)
        const quote = await Quote.findOne().skip(random)
        res.status(200).json({data: quote})
    } catch (error){
        console.error(error)
    }

}