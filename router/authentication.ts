import * as express from 'express'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import enviroment from './../common/common'
import {User} from './../model/User'
import {check, validationResult } from 'express-validator'
import validadToken from './../middleware/authentication'

const router = express.Router();

// @route           GET api/authentication
// @description     Get logged in user
// @access          Private

router.get('/', validadToken, async (req: any, res: any) => {
    try {
        const user: object = await (req.user)
        res.json(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ msg: "Server Error"})
    }
})

// @route           POST api/authentication
// @description     Authenticate user and get is token
// @access          Private

router.post('/', [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please write your password").exists()
], async (req, res) => {
    const errors = validationResult(req)
    if ( !errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Destructing the data form the request.body
    const { email, password} = req.body

    try {
        let user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ msg: "Email e/or password invalid" })
        }

        // See if the password get in the email is equal to the password pass in the authentication
        const isMatch = await bcrypt.compare(password, user.password);
        
        if ( !isMatch ) {
            return res.status(400).json({ msg: "Email e/or password invalid" })
        }

        const payload = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }

        jwt.sign(payload, enviroment.jwtSecret, {
            expiresIn: 5 * 60 // 5 minutes to expire
        }, (error, token) => {
            if (error) {
                throw error
            }
            res.json({ token })
        })
    } catch (error) {
        console.log(error.message)   
    }
})

module.exports = router;
