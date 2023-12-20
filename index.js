const express = require('express')
const connectDB = require('./config/db')


//create server
const app = express()

console.log('Creating Node send')
//connect db
connectDB()

//port app
const port = process.env.PORT || 4000;

//available to read the values of a body
app.use(express.json())

//App routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/links', require('./routes/links'))
app.use('/api/files', require('./routes/files'))

//run app
app.listen(port,'0.0.0.0', () => {
    console.log('listening on port ' + port)
})