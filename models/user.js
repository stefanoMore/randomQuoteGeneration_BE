import mongoose from 'mongoose';
import validator from 'validator'
import bcrypt from 'bcrypt'

const userSchema =  mongoose.Schema({
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

userSchema.statics.login =  async function(email, password) {
    const user = await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw Error('INCORRECT PASSWORD')
    }
    throw Error('INCORRECT EMAIL')
}
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

// static Method to login user
export const User = mongoose.model('User', userSchema)
export default User;
