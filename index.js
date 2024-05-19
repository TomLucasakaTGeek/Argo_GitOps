//A simple backend application using express.js
const express = require('express')
const app = express()

//default route
app.get('/', (req, res)=>{
    res.send("Hello World!")
})

//Server runs on port 6000
app.listen(6000, ()=>{
    console.log('Server is running')
})