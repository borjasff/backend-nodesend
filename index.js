const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')

//create server
const app = express()

console.log('Creating Node send')
//connect db
connectDB()

//available cors
const optionsCors = {
    origin: process.env.FRONTEND_URL,
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(optionsCors))

//port app
const port = process.env.PORT || 4000;

//available to read the values of a body
app.use(express.json())

//available public fodler
app.use( express.static('uploads'))

//App routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/links', require('./routes/links'))
app.use('/api/files', require('./routes/files'))

//run app
app.listen(port,'0.0.0.0', () => {
    console.log('listening on port ' + port)
})