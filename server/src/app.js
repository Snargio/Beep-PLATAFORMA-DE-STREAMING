require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const path = require('path')
const routs = require('./routes')
const cookieParser = require('cookie-parser')

// Set Teamplate Enginer
app.set('views', path.join(__dirname, '../../web/src/pages'))
app.set('view engine', 'ejs')
// app.use(express.static('../../web/public'))
app.use('/css', express.static(__dirname + '../../web/public'))

// -------------

// ------------- Conect Banco
mongoose.connect(
  process.env.MONGO_CONNECTION_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  error => {
    if (error) {
      console.log(error)
    } else {
      console.log('Mongo connected')
    }
  }
)

// -------------

app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.use(express.json())

app.use(routs)

app.listen(process.env.PORT, () => {
  console.log('Server runing')
})
