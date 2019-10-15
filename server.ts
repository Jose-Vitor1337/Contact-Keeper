import createConnection from './config/database'
import enviroment from './common/common'
import cors from 'cors'
import * as express from 'express'

const app = express();

app.get('/', (req, res) => res.json({ msg: "Welcome to the Contact Keeper API, in the BackEnd" }))
app.use(cors())

// Connect Database MongoDB
createConnection();

// Init Middleware
app.use(express.json())

// Define our Router from de Contexts Api from this aplication
app.use('/api/users', require('./router/users'))
app.use('/api/authentication', require('./router/authentication'))
app.use('/api/contacts', require('./router/contacts'))



// Creating a local server
app.listen(enviroment.port, () => console.log(`The Server start on the port ${enviroment.port}`))