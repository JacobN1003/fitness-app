const express = require('express')
const app = express()
const fetch = require('request')
const BASE_URL = 'https://wger.de/api/v2/'
const PORT = 5000
const {MongoClient} = require('mongodb')




async function testDatabase(){
    const uri = "mongodb+srv://noren002:JustinN27@cluster0.zxtob.mongodb.net/cluster0?retryWrites=true&w=majority"
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    try {
        await client.connect()
        await  listDatabases(client)
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
testDatabase().catch(console.error)






requestData = (myUrl, apiUrl) =>{
    app.get(myUrl, (req, res) => {
        fetch(BASE_URL + apiUrl, (error, response) => {
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
}

requestData('/ingredients', `ingredient?limit=10000&language=2`) //get ingredients data
requestData('/exercises', `exerciseinfo?limit=400&language=2&license_author=${"wger.de"}`) //get exercises data
requestData('/equipment', 'equipment?limit=50') //get equipment data

app.listen(PORT, () => console.log(`listening on port ${PORT}..`))