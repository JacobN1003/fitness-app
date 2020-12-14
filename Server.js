require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { PORT } = process.env || 5001

app.use(cookieParser())
app.use(bodyParser.json())

//MongoDB CRUD Functions -----------------------------------------------------
const {Login, Register, Authenticate, getUser, Logout, 
        addFood, addExercise, createWorkout, removeWorkout, removeExercise, removeFood,
        changeUsername, changePassword, changeEmail,  createMeal} = require('./dbFunctions')
app.post('/getuser', getUser)
app.post('/login', Login)
app.get('/logout', Logout)
app.post('/register', Register)

app.put('/add_exercise', addExercise)
app.put('/create_workout', createWorkout)
app.put('/remove_exercise', removeExercise)
app.put('/remove_workout', removeWorkout)

app.put('/create_meal', createMeal)
app.put('/add_food', addFood)
app.put('/remove_food', removeFood)

app.put('/change_username', changeUsername)
app.put('/change_email', changeEmail)
app.put('/change_password', changePassword)

//Request API Data -----------------------------------------------------------
const {getExercises, getEquipment, getIngredients} = require('./apiFunctions')
app.get('/exercises', getExercises)
app.get('/equipment', getEquipment)
app.get('/ingredients', getIngredients)

if(process.env.NODE_ENV === 'production'){
        app.use(express.static('frontend/build'))
}

//Start the server
app.listen(process.env.PORT || 5001, () => console.log(`listening on port ${PORT}..`))