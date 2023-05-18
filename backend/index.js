const express = require('express')
require('dotenv').config()
const userData = require("./model/userDB")
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')


const app = new express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

let cors = require('cors')
app.use(cors())

app.get('/',(request,response)=>{
    response.send("<h1>Bloodbank Api home</h1>")
})

app.get('/users', async (req,res)=>{
    let result = await UserInfo.find()
    res.json(result)
})

app.post('user/new',async (req,res)=>{
    let user = new UserInfo(req.body)
   user.save()
   res.send(req.body)
})

app.listen(5000)