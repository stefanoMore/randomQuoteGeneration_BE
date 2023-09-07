import {User} from "../models/user.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";
import {authenticateUser} from "../shared/auth/auth.helper.js";



const SECRET_KEY = "onapinPOIJWFio214389nojansifa";
const TOKEN_AGE = 3 * 24 * 60 * 60;
//const TOKEN_AGE = 60;

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code)
}

const createToken = (id) => {
    return jwt.sign({ id }, SECRET_KEY, {
        expiresIn: TOKEN_AGE
    } )
}


export const loginAccount = async (req, res) => {
    const { email, password } = req.body
    try{
        const result = await  authenticateUser(email, password);
        if(result.isSuccess){
            const token = createToken(result)
            res.cookie('jwt', token, {
                algorithm: 'RS256',
                // sameSite: 'None',
                // secure: true,
                maxAge: TOKEN_AGE * 1000})
            res.status(201).json({message: result.message});
        }
        else{
            res.status(401).json({message: result.message})
        }
    }catch (error) {
        handleErrors(error)
        res.status(404).json({message: error.message})
    }

}

export const registerAccount = async (req, res) => {
    const { email, password } = req.body
    try{
       const user = await User.create({email, password})
        res.status(200).json({message: 'User created Successfully'})
    }catch (error) {
        handleErrors(error)
        res.status(404).json({message: error.message})
    }
}


export const verifyToken = (req, res) => {
    const { token } = req.body
    if(!!token){
        console.log('entrato')
        try{
            const payload = jwt.verify(token, SECRET_KEY)
            res.send({isValid: true, payload: payload})
        }catch (error) {
            res.send({isValid: false, message: error.message})
        }

    }else{
        res.status(401).json({isValid: false, message: 'Expired Session'})
    }

}


//mongoose Hooks partono quando succede qualcosa al DB

