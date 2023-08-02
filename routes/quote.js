import express from "express";
import {insertQuotesList, getAllQuotes, getRandomQuote} from "../controllers/quote.js";

const router = express.Router()

router.get('/', getAllQuotes)
router.post('/', insertQuotesList)
router.get('/randomQuote', getRandomQuote)


export default router