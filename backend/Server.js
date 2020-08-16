const express = require('express')
const app = express()
const fetch = require('request')
const BASE_URL = 'https://wger.de/api/v2/'
const PORT = 5000

app.get('/exercises', (req, res) => {
    fetch(BASE_URL + `exerciseinfo?language=2&license_author=${"wger.de"}`, (error, response) => {
        if(!error && response.statusCode === 200){
            data = JSON.parse(response.body)
            datalist = []
            data.map(each => { 
                datalist.push(each) 
            })
            res.send({ 'message': "success", 'status': response.statusCode, 'data': datalist })
        }
        else res.send({ 'message': "There was an error", 'status': response.statusCode, 'data': null })
    })
})

app.get('/exerciseimages', (req, res) => {
    fetch(BASE_URL + `exerciseimage`, (error, response) => {
        if(!error && response.statusCode === 200){
            data = JSON.parse(response.body)
            datalist = []
            data.map(each => { 
                datalist.push({"id": each.exercise, "exercise": each.image}) 
            })
            res.send({ 'message': "success", 'status': response.statusCode, 'data': datalist })
        }
        else res.send({ 'message': "There was an error", 'status': response.statusCode, 'data': null })
    })
})

app.get('/muscles', (req, res) => {
    fetch(BASE_URL + 'muscle', (error, response) => {
        if(!error && response.statusCode === 200){
            data = JSON.parse(response.body)
            datalist = []
            data.map(each => { 
                datalist.push(each.name) 
            })
            res.send({ 'message': "success", 'status': response.statusCode, 'data': datalist })
        }
        else res.send({ 'message': "There was an error", 'status': response.statusCode, 'data': null })
    })
})



app.listen(PORT, () => console.log(`listening on port ${PORT}..`))