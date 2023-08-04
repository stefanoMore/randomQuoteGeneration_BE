import {User} from "../models/user.js";
import mongoose from "mongoose";
import validator from "validator";
import jwt from 'jsonwebtoken'



const SECRET_KEY = "onapinPOIJWFio214389nojansifa";
const TOKEN_AGE = 3 * 24 * 60 * 60;

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code)
}

const createToken = (id) => {
    return jwt.sign({ id }, SECRET_KEY, {
        expiresIn: TOKEN_AGE
    } )
}


export const registerAccount = async (req, res) => {
    const { email, password } = req.body
    try{
        const user = await User.create({email, password})
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: TOKEN_AGE * 1000}) // mando il token al FE, hhtpOnly non può esser cambiato e expire with the age
        res.status(201).json({user, token: token});
    }catch (error) {
        handleErrors(error)
        res.status(404).json({message: error.message})
    }

}

//mongoose Hooks partono quando succede qualcosa al DB

