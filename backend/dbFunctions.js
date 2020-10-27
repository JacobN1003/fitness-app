require('dotenv').config()
const { MONGO_USERNAME, MONGO_PW, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFE, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_LIFE } = process.env
const { MongoClient } = require('mongodb')
const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PW}@cluster0.zxtob.mongodb.net/cluster0?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt-nodejs')

exports.Login = async function(req, res){
    let {username, password} = req.body

    try{
        await client.connect()
        let user = await client.db('fitness-app').collection('users').findOne({"username": username})
        const pw_match = bcrypt.compareSync(password, user.password)      
        if(user !== null && pw_match){
            // let refreshToken = jwt.sign(user, REFRESH_TOKEN_SECRET, {algorithm: "HS256", expiresIn: REFRESH_TOKEN_LIFE})
            // await client.db('fitness-app').collection('users').updateOne({"username": username}, {$set: {"refreshToken": refreshToken}})
            let accessToken = jwt.sign({"username":user.username}, ACCESS_TOKEN_SECRET, {algorithm: "HS256", expiresIn: ACCESS_TOKEN_LIFE})
            res.cookie("jwt", accessToken, {httpOnly: true})
            res.send({'message':'ok', 'data': {"user":user , "cookie": req.cookies}})// <--- req.cookie is causing server crash, figure out how to show cookies..
            client.close()
        }
        else res.send({'message': 'Invalid Credentials'})
    }
    catch(err){ 
        console.log(err) 
    }
}

 exports.addUser = async function(req, res){
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

exports.verifyUserLoggedIn = async function(req, res, next){
    let accessToken = req.cookies.jwt
    //let {username} = req.body
    if(!accessToken) return res.send({"message": "No token found"})
    let payload
    try{
        payload = jwt.verify(accessToken, ACCESS_TOKEN_SECRET)
        res.send({"message": "ok", "data": payload})
        // let accessToken = jwt.sign({"username":user.username}, ACCESS_TOKEN_SECRET, {algorithm: "HS256", expiresIn: ACCESS_TOKEN_LIFE})
        // res.cookie("jwt", accessToken, {httpOnly: true})
        next()
    }
    catch(e){
        return res.send({"message": "Invalid token / User not logged in"})
    }
}