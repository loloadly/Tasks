const express = require('express')
const News = require('./models/news')
const newsRoute = require('./routers/new-route')
require('./db/mongoose')
const app = express()
app.use(express.json())
app.use(newsRoute)
const port = 3000

app.listen(port,()=>console.log('Server is ON'))