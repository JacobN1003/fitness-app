require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { PORT } = process.env 

app.use(cookieParser())
app.use(bodyParser.json())

//MongoDB CRUD Functions ------------------------------------------------------------------------------------
const {Login, addUser} = require('./dbFunctions')
app.post('/login', Login)
app.post('/add_user', addUser)

//Request API Data ------------------------------------------------------------
const {getExercises, getEquipment, getIngredients} = require('./apiFunctions')
app.get('/exercises', getExercises)
app.get('/equipment', getEquipment)
app.get('/ingredients', getIngredients)

//Start the server
app.listen(PORT, () => console.log(`listening on port ${PORT}..`))