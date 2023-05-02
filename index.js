const express = require('express')
const { connection } = require('./config/db')
const { userRoutes } = require('./routes/userRoute')
const { postRoutes } = require('./routes/postRoute')
const { authentication } = require('./middlewares/auth.middleware')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(authentication)

app.use("/users", userRoutes)

app.use("/posts", postRoutes)


app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)        
    }

    console.log(`server is connected to ${process.env.port}` )
})