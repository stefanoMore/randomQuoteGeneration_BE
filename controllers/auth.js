
import jwt from 'jsonwebtoken'
import {authenticateUser} from "../shared/auth/auth.helper.js";

//mongo user Model
import {User} from "../models/user.js";

// mongo User Verification Model
import {UserOTPVerification} from "../models/UserOTPVerification.js"

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

const sendVerificationOTP = async () => {
    try{
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`

    }catch (error) {

    }
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

export const signUp = async (req, res) => {
    let {name, surname, dateOfBirth,  email, password, } = req.body
    name = name.trim();
    surname = surname.trim();
    dateOfBirth = dateOfBirth.trim();
    password = password.trim();
    if(name === "" || email === "" || password === ""){
        res.json({
            status: "FAILED",
            message: "Empty input Field"
        });
    }else if(!/^[A-Za-z ]*$/.test(name) || !/^[A-Za-z ]*$/.test(surname)){
        res.json({
            status: "FAILED",
            message: "Invalid name or surname entered"
        })
    }
    else{
        User.find({email})
            .then(async (result) => {
                if (result.length) {
                    res.json({
                        status: "FAILED",
                        message: "User with the provided email already exists"
                    })
                } else {
                    try {
                        const user = await User.create({name, surname, email, password, verified: false })
                            .then((result) => {
                                //sendVerificationCode(result, res)
                                console.log(result,res)
                            })
                            .catch((err) => {
                                console.log(err);
                                res.json({
                                    status:"FAILED",
                                    message: "An error occurred while saving user account!"
                                });
                            });
                        res.status(200).json({
                            status: "OK",
                            message: 'User created Successfully'})
                    } catch (error) {
                        handleErrors(error)
                        res.status(404).json({message: error.message})
                    }
                }
            })

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

