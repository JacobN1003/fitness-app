require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { PORT } = process.env 

app.use(cookieParser())
app.use(bodyParser.json())

//MongoDB CRUD Functions -----------------------------------------------------
const {Login, Register, Authenticate, getUser, Logout, 
        addWorkout, addFood, removeWorkout, removeFood} = require('./dbFunctions')
app.post('/getuser', getUser)
app.post('/login', Login)
app.get('/logout', Logout)
app.post('/register', Register)
app.put('/add_workout', addWorkout)
app.put('/add_food', addFood)
app.put('/remove_workout', removeWorkout)
app.put('/remove_food', removeFood)

//Request API Data -----------------------------------------------------------
const {getExercises, getEquipment, getIngredients} = require('./apiFunctions')
app.get('/exercises', getExercises)
app.get('/equipment', getEquipment)
app.get('/ingredients', getIngredients)

//Start the server
app.listen(PORT, () => console.log(`listening on port ${PORT}..`))