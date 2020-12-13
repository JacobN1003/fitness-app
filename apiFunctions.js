const BASE_URL = 'https://wger.de/api/v2/'
const fetch = require('request')

exports.getExercises = function(req, res){
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
}

exports.getEquipment = function(req, res){
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
}

exports.getIngredients = function(req, res){
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
}