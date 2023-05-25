const express = require('express')
require('dotenv').config()
const userData = require("./model/userDB")
const donorData = require('./model/DonorDB')
const requestData = require("./model/RequestDB")
const verfiedRequest = require('./model/Verifiedrequest')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const jwt = require('jsonwebtoken')



const app = new express()

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '')
    }
    return null
  }


app.use(express.urlencoded({extended:true}))
app.use(express.json())
let cors = require('cors')
app.use(cors())


app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)


app.get('/',(request,response)=>{
    response.send("<h1>Bloodbank Api home</h1>")
})

app.get('/users', async (req,res)=>{
    let result = await userData.find()
    console.log("data fetched")
    console.log(result)
    res.json(result)
})

app.get('/requests', async (req,res)=>{
  let result = await requestData.find()
  console.log("data fetched")
  res.json(result)
})

app.post('/request/new',async (req,res)=>{
  let request = new requestData(req.body)
 request.save()
 res.send(`reques boyd is ${req.body}`)
})


app.post('/user/new',async (req,res)=>{
    let user = new userData(req.body)
   user.save()
   res.send(req.body)
})

app.post('verified/request/new',async (req,res)=>{
  let request = new verfiedRequest(req.body)
 request.save()
 res.send(req.body)
})

app.post('/user/delete',async (req,res)=>{
  await userData.findByIdAndDelete(req.body._id)
  res.send("user deleted")

})

app.post('/request/delete',async (req,res)=>{
  await requestData.findByIdAndDelete(req.body._id)
  res.send("request deleted")
})

app.post('/verified/request/delete',async (req,res)=>{
  await verfiedRequest.findByIdAndDelete(req.body._id)
  res.send("request deleted")
})

app.get('/donors', async (req,res)=>{
  let result = await donorData.find()
  console.log("data fetched")
  console.log(result)
  res.json(result)
})

app.post('/donor/new',async (req,res)=>{
  let donor = new donorData(req.body)
 donor.save()
 res.send(req.body)
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})