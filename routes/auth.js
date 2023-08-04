import express from "express";
import {registerAccount} from "../controllers/auth.js";

const router = express.Router()


router.post('/register', registerAccount)
router.post('/login', () => {})


export default router