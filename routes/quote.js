import express from "express";
import {insertQuotesList, getAllQuotes, getRandomQuote} from "../controllers/quote.js";
import {requireAuth} from "../middleware/authMiddleware.js";

const router = express.Router()

router.get('/',requireAuth, getAllQuotes)
router.post('/', insertQuotesList)
router.get('/randomQuote', requireAuth, getRandomQuote)


export default router