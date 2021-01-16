

const express = require('express')
const app = express()
const port = 3000
const request = require ('request')
const path = require('path')

const publicDirectory = path.join(__dirname,'../public')
app.use(express.static(publicDirectory))
const viewsPath= path.join(__dirname,'../templates/views')
app.set('view engine', 'hbs');
app.set('views',viewsPath)



app.get('', function (req, res) {
    var url ="http://newsapi.org/v2/top-headlines?country=eg&category=entertainment&apiKey=e98b265a08ac4748a98bb11fc5f865c1"
    request(url, function (error, response) {
        var data = JSON.parse(response.body);
        res.render("index", { data: data });
    });
});

const hbs = require('hbs')
const partialsPath = path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialsPath)


app.listen(port,()=>console.log('Listening on server 3000'))
