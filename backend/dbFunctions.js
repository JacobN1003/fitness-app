require('dotenv').config()
const { MONGO_USERNAME, MONGO_PW, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFE, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_LIFE } = process.env
const { MongoClient } = require('mongodb')
const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PW}@cluster0.zxtob.mongodb.net/cluster0?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt-nodejs')
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }

exports.removeWorkout = async function(req, res){
    let {username, workout} = req.body
    try{
        await client.db('fitness-app').collection('users')
                    .findOneAndUpdate({"username": username}, {$pull: {"workouts": {"name": workout}}}, {returnOriginal: false},
                    (err, document)=>{ res.send({'message': 'removed workout', 'data': document}) })
    }
    catch(err){
        console.log(err)
    }
}

exports.removeFood = async function(req, res){
    let {username, food} = req.body
    try{
        await client.db('fitness-app').collection('users')
                    .findOneAndUpdate({"username": username}, {$pull: {"meals": {"name":food}}}, {returnOriginal: false},
                    (err, document)=>{ res.send({'message': 'removed food', 'data': document})})
    }
    catch(err){
        console.log(err)
    }
}

exports.addWorkout = async function(req, res){
    let {username, exercise} = req.body
    try{
        await client.db('fitness-app').collection('users')
                    .findOneAndUpdate({"username": username}, {$push: {"workouts": exercise}}, {returnOriginal: false},
                    (err, document)=>{res.send({'message': 'adding workout', 'data': document})})
    }
    catch(err){
        console.log(err)
    }
}

exports.addFood = async function(req, res){
    let {username, food} = req.body
    try{
        await client.db('fitness-app').collection('users')
                    .findOneAndUpdate({"username": username}, {$push: {"meals": food}}, {returnOriginal: false},
                    (err, document)=> {res.send({'message': 'adding food item', 'data': document})})
        
    }
    catch(err){
        console.log(err)
    }
}

exports.Authenticate = async function(req, res, next){
    let accessToken = req.header('jwt')
    if(!accessToken) return res.status(401).send({"message": "No token found"})
    try{
        let verified = jwt.verify(accessToken, ACCESS_TOKEN_SECRET)
        req.verified_user = verified
        res.send({"message": "ok", "data": verified})
        next()
    }
    catch(e){
        return res.status(400).send({"message": "Invalid token / User not logged in"})
    }
}

exports.getUser = async function(req, res){
    let {username} = req.body
    try{
        let user = await client.db('fitness-app').collection('users').findOne({"username": username})
        res.send({'message':'ok', 'data': {"user":user}})
    }
    catch(e){
        return res.status(400).send({"message": "Failed to retrieve user info"})
    }
}

exports.Login = async function(req, res){
    let {username, password} = req.body
    try{
        await client.connect()
        let user = await client.db('fitness-app').collection('users').findOne({"username": username})
        const pw_match = bcrypt.compareSync(password, user.password)      
        if(user !== null && pw_match){
            let accessToken = jwt.sign({"username":user.username}, ACCESS_TOKEN_SECRET, {algorithm: "HS256", expiresIn: ACCESS_TOKEN_LIFE})
            res.header("jwt", accessToken)
            // res.cookie("jwt", accessToken, {httpOnly: true})
            localStorage.setItem('jwt', accessToken)
            res.send({'message':'ok', 'data': {"user":user, "token": accessToken}})
            //client.close()
        }
        else res.send({'message': 'Invalid Credentials'})
    }
    catch(err){ 
        console.log(err) 
    }
}

exports.Logout = async function(req, res){
    localStorage.removeItem('jwt')
    res.send({'message':'Logged out'})
}

 exports.Register = async function(req, res){
    let {username, password, re_password, email} = req.body
    let encrypted_pw = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
    const pw_regex = password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{5,}$/)
    const email_regex = email.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
    
    let new_user = {
        "username": username,
        "password": encrypted_pw,
        "email": email,
        "workouts": [],
        "meals": [],
    }
    
    //Username Validation
    if(username === ""){
        res.send({'message':"Enter a username", 'data': new_user})
        return
    }
    if(username.length < 5){
        res.send({'message': "Username needs to be at least 5 characters", 'data': new_user})
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
}



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

