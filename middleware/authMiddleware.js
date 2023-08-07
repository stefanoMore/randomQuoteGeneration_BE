import jwt from "jsonwebtoken";


const SECRET_KEY = "onapinPOIJWFio214389nojansifa";
export const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt

    jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
        if(err)
        {
            res.send({message:err.message, code: 401, data: []})
        }else{
            next();
        }
    })

}