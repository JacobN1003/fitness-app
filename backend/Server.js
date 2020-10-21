const express = require('express')
const app = express()
const fetch = require('request')
const bodyParser = require('body-parser');
const BASE_URL = 'https://wger.de/api/v2/'
const PORT = 5001
const {MongoClient} = require('mongodb')
const uri = "mongodb+srv://noren002:JustinN27@cluster0.zxtob.mongodb.net/cluster0?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(bodyParser.json())

//Helper Funcions ------------------------------------------------------------------------------------
async function checkUserExists(username){
    let usernames = []
    try{
        await client.connect()
        await client.db('fitness-app').collection('users').find().toArray().then(users => { 
            users.forEach( user => {usernames.push(user.username.toLowerCase())})
        })
    }
    catch(err){ 
        console.log(err) 
    }
    if(usernames.includes(username.toLowerCase())) return false
    else return true
}

//MongoDB CRUD Functions ------------------------------------------------------------------------------------
app.post('/login', async (req, res)=>{
    let {username, password} = req.body
    try{
        await client.connect()
        let user = await client.db('fitness-app').collection('users').findOne({"username": username, "password": password})
        if(user !== null){
            res.send({'message':'ok', 'data': user})
            client.close()
        }
        else res.send({'message': 'Invalid Credentials', 'data': {'username': username, 'password': password}})
    }
    catch(err){ 
        console.log(err) 
    }
})

app.post('/add_user', async (req, res)=>{
    let {username, password, re_password, email} = req.body
    const pw_regex = password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{5,}$/)
    const email_regex = email.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
    let new_user = {
        "username": username,
        "password": password,
        "email": email,
        "workouts": [],
        "Meals": [],
    }
    
    //Username Validation
    if(username === ""){
        res.send({'message':"Enter a username", 'data': new_user})
        return
    }
    if(username.length < 5){
        res.send({'message': "Username needs to be at least 5 characters", 'data': new_user, 'length': username})
        return
    }

    //Password Validation
    if(password === ""){
        res.send({'message':"Enter a password", 'data': new_user})
        return
    }
    if(password !== re_password){
        res.send({'message':"Passwords need to match", 'data': new_user})
        return
    }
    if(pw_regex === null){
        res.send({'message':"Passwords should contain at least one uppercase, one lowercase," +
        " one number, and be at least 5 characters long", 'data': new_user})
        return
    }

    //Email Validation
    if(email === ""){
        res.send({'message':"Enter an email address", 'data': new_user})
        return
    }
    if(email_regex === null){
        res.send({'message':"Enter a valid Email address", 'data': new_user})
        return
    }

    let goodUser = await checkUserExists(username)
    if(goodUser){
        await client.connect()
        await client.db('fitness-app').collection('users').insertOne(new_user)
        await client.close()
        res.send({'message':"ok", 'data': new_user})
    }
    else {
        res.send({'message':"Username already exists", 'data': new_user})
        return
    }
})



//Request API Data --------------------------------------------------------------------------------------------
app.get('/exercises', (req, res) => {
    fetch(BASE_URL + `exerciseinfo?limit=400&language=2&license_author=${"wger.de"}`, (error, response) => {
        if(!error && response.statusCode === 200){
            data = JSON.parse(response.body)
            datalist = []
            data.results.map(each => { 
                datalist.push(each) 
            })
            res.send({ 'message': "ok", 'status': response.statusCode, 'data': datalist})
        }
        else res.send({ 'message': "bad", 'status': response.statusCode, 'data': null })
    })
})

app.get('/equipment', (req, res) => {
    fetch(BASE_URL + 'equipment?limit=50', (error, response) => {
        if(!error && response.statusCode === 200){
            data = JSON.parse(response.body)
            datalist = []
            data.results.map(each => { 
                datalist.push(each) 
            })
            res.send({ 'message': "ok", 'status': response.statusCode, 'data': datalist })
        }
        else res.send({ 'message': "bad", 'status': response.statusCode, 'data': null })
    })
})

app.get('/ingredients', (req, res) => {
    fetch(BASE_URL + `ingredient?limit=10000&language=2`, (error, response) => {
        if(!error && response.statusCode === 200){
            data = JSON.parse(response.body)
            datalist = []
            data.results.map(each => { 
                datalist.push(each) 
            })
            res.send({ 'message': "ok", 'status': response.statusCode, 'data': datalist })
        }
        else res.send({ 'message': "bad", 'status': response.statusCode, 'data': null })
    })
})

app.listen(PORT, () => console.log(`listening on port ${PORT}..`))