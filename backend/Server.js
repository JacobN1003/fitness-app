require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { PORT } = process.env 

app.use(cookieParser())
app.use(bodyParser.json())

//MongoDB CRUD Functions -----------------------------------------------------
const {Login, Register, Authenticate, getUserInfo, Logout, addWorkout, addFood} = require('./dbFunctions')
app.post('/getuserinfo', getUserInfo)
app.post('/login', Login)
app.get('/logout', Logout)
app.post('/register', Register)
app.put('/add_workout', Authenticate, addWorkout)
app.put('/add_food', Authenticate, addFood)

//Request API Data -----------------------------------------------------------
const {getExercises, getEquipment, getIngredients} = require('./apiFunctions')
app.get('/exercises', getExercises)
app.get('/equipment', getEquipment)
app.get('/ingredients', getIngredients)

//Start the server
app.listen(PORT, () => console.log(`listening on port ${PORT}..`))