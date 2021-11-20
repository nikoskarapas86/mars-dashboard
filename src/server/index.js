require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

// your API calls
const ROVERS_URL = 'https://api.nasa.gov/mars-photos/api/v1/rovers';

app.get('/rovers', async (req, res) => {
    try {
        let rovers = await fetch(`${ROVERS_URL}?api_key=${process.env.API_KEY}`)
        .then(res => res.json())
        res.send({rovers})
    } catch (err) {
        console.log('error', err);
    }
})


app.get('/rovers/:name', async (req, res) => {
    try {
        let roverData = await fetch(`${ROVERS_URL}/${req.params.name.toLowerCase()}/photos?sol=1000&page=1&api_key=${process.env.API_KEY}`)
        .then(res => res.json())
        res.send(roverData)
    } catch (err) {
        console.log('error', err);
    }
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))