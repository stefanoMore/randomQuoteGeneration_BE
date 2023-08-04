import mongoose, {mongo} from "mongoose";
import validator from 'validator'
import bcrypt from 'bcrypt'


const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please Enter an Email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    password:{
        type: String,
        required: [true, 'Please Enter a Password'],
        minlength: [6,'Min password length is 6 caracter']
    }
})

// fire a function after doc saved to db
userSchema.post('save', function (doc, next) {
    console.log('NEW USER WAS CREATED AND SAVED', doc)
    next()
})

//fire before saved in the db
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(); // GENERATE THE SALTE FOR THE HASH PROCESS
    this.password = await bcrypt.hash(this.password, salt);
    next();
})
export const User = mongoose.model('User', userSchema)