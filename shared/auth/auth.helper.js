import { User } from "../../models/user.js";
import bcrypt from "bcrypt";


export async function authenticateUser (email, password) {
    const user = await User.findOne({email});
    if(!user){
        return {isSuccess: false, message: 'User not found.'}
    }

    const auth = await bcrypt.compare(password, user.password);
    if(!auth){
        return {isSuccess: false, message: 'Invalid username or password.'}
    }

    return {isSuccess: true, message: 'Account registered successfully', user}


}