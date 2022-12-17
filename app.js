require('dotenv').config(); 
const mongoose = require('mongoose')
const express = require('express')
const app =  express();
const path = require("path")

// Importando Rotas
const userRouter = require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter')
const videosRoute = require('./routes/VideosRouter')

// -------------


// Set Teamplate Enginer
app.set('views', path.join(__dirname,"./Templates")  )
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
// -------------



// ------------- Conect Banco
mongoose.connect(process.env.MONGO_CONNECTION_URL,
    { 
        useNewUrlParser:true, 
        useUnifiedTopology:true 
    } ,
    (error) => {
        if (error){
         console.log(error);}
        else{
        console.log('Mongo connected');}
    } )
// -------------

const cookieParser = require('cookie-parser')


// ------------- Rotas
// app.get('/', (req,res)=> {res.render('Home')});

app.use('/',cookieParser(),
express.json(),
express.urlencoded({extended:true}), videosRoute);

app.use('/user',express.urlencoded({extended:true}), userRouter);

// app.use('/admin', express.json() , adminRouter )

// app.use('/videos',express.json(), VideosRouter  )
// -------------



app.listen(process.env.PORT, () =>{ console.log("Server Running"); })