const express = require('express')
const app = express()
const fetch = require('request')
const BASE_URL = 'https://wger.de/api/v2/'
const PORT = 5000
const {MongoClient} = require('mongodb')
const uri = "mongodb+srv://noren002:JustinN27@cluster0.zxtob.mongodb.net/cluster0?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

//MongoDB CRUD Functions ------------------------------------------------------------------------------------
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(" -", db.name));
};

app.post('/adduser', (req, res)=>{

})
async function addUser(client, user){
    const result = await client.db('fitness-app').collection('users').insertOne(user)
    console.log(result)
}

async function removeUser(client, user){
    //...
}

async function editUser(client, user){
    //...
}

async function findUser(client, user){
    //...
}



//Request API Data --------------------------------------------------------------------------------------------
app.get('/exercises', (req, res) => {
    fetch(BASE_URL + `exerciseinfo?limit=400&language=2&license_author=${"wger.de"}`, (error, response) => {
        if(!error && response.statusCode === 200){
            data = JSON.parse(response.body)
            datalist = []
            data.results.map(each => { 
                datalist.push(each) 
            })
            res.send({ 'message': "success", 'status': response.statusCode, 'data': datalist })
        }
        else res.send({ 'message': "There was an error", 'status': response.statusCode, 'data': null })
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
            res.send({ 'message': "success", 'status': response.statusCode, 'data': datalist })
        }
        else res.send({ 'message': "There was an error", 'status': response.statusCode, 'data': null })
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
            res.send({ 'message': "success", 'status': response.statusCode, 'data': datalist })
        }
        else res.send({ 'message': "There was an error", 'status': response.statusCode, 'data': null })
    })
})


//Run Server -----------------------------------------------------------------------------------------------------
async function run(){
    await client.connect()
    await listDatabases(client)
}
run()
//client.connect()
app.listen(PORT, () => console.log(`listening on port ${PORT}..`))