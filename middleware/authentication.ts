import * as jwt from 'jsonwebtoken'
import enviroment from './../common/common'

const validadeToken = (req, res, next) => {
    // Get token from the header
    const token = req.header('x-auth-token');

    // Check if is not a token
    if (!token){
        return res.status(401).json({ msg: "No token, authorization denied" })
    }

    try {
        // decoding the token passed 
        const decodedToken: any = jwt.verify(token, enviroment.jwtSecret);
        
        req.user = decodedToken.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: "Token is not valid" })
    }
}

export default validadeToken