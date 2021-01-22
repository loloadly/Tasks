const express = require('express')
const News = require('./models/news')
const Reporter = require('./models/reporter')
const newsRoute = require('./routers/new-route')
const reporterRoute = require('./routers/reporter-route')
require('./db/mongoose')
const app = express()
app.use(express.json())
app.use(newsRoute)
app.use(reporterRoute)
const port = 3000

app.listen(port,()=>console.log('Server is ON'))