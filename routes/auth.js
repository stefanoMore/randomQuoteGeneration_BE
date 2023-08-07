import express from "express";
import {loginAccount, registerAccount, verifyToken} from "../controllers/auth.js";

const router = express.Router()


router.post('/register', registerAccount)
router.post('/login', loginAccount)
router.post('/token/verify', verifyToken)


export default router