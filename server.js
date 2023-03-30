const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const multer  = require('multer')
const upload = multer()
const errorHandler = require('./middleware/errorHandler')
const { logEvents,logger} = require('./middleware/logger')
const {port} = require('./appConfig.json')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) 
app.use(logger)
app.use('/mis',upload.none(),require('./routes/misRoutes'))



app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.render('404')
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)

app.listen(port,
    ()=>{
        console.log(`server running in port - ${port}`);
        logEvents(`Server running in ${port}`, 'infoLog.log')
    })

    
