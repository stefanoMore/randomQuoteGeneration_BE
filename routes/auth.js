import express from "express";
import {loginAccount, signUp, verifyToken} from "../controllers/auth.js";

const router = express.Router()


router.post('/signUp', signUp)
router.post('/login', loginAccount)
router.post('/token/verify', verifyToken)


export default router