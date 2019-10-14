import * as express from 'express'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import enviroment from './../common/common'
import{ check, validationResult } from 'express-validator'
import {User} from './../model/User'

const router = express.Router()

// @route           POST api/users
// @description     Register a user
// @access          Public from everybody   

router.post('/',[
    check("name", "Please enter a name").not().isEmpty(),
    check("email", "Please include a valid a email").isEmail(),
    check("password", "Please enter a password with at least 6 characters").isLength({ min: 6 })
], async (req, res) => {

   const errors = validationResult(req);
    
   if ( !errors.isEmpty() ) {
       return res.status(400).json({ errors: errors.array() });
   }

   // Destructing the data form the request.body
   const { name , email, password} = req.body

   try {
       let user = await User.findOne({ email })

       if (user) {
           return res.status(400).json({ msg: "User already exist" })
       }

       user = new User({ name, email, password })

       const salt = await bcrypt.genSalt(10);
       user.password = await bcrypt.hash(password, salt);

       await user.save()

       // the date tha will go with the User when he authentication with the system
       const payload = {
           user: {
                id: user.id,
                name: user.name,
                email: user.email
           }
       }

       // Creating the jasonWebToken configurations for the user
       jwt.sign(payload, enviroment.jwtSecret, {
           expiresIn: 5 * 60 // 5 minutes to expire
       }, (error, token) => {
           if (error) {
               throw error
           }
           res.json({ token })
       })

   } catch (error) {
       console.error(error.message)
   }
})


module.exports = router;
