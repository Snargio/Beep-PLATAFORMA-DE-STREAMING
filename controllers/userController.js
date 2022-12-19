const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const ErrorEmailPassword = 'Email or password incorrect';


const {loguinValidate, registerValidate} = require('./validate')


const pagevídeo = (req,res)=>{
    res.render('register')
};

const pageRegister = (req,res)=>{
    res.render('register')
};
const pageLogin = (req,res)=>{
    res.render('login')
}

const pageLogout = (req,res)=>{
    res.render('logout')
}


    const register =  async ( req, res ) => {

        const {error} = registerValidate(req.body)
        if (error){ return res.status(400).send(error.message)}

        const selectedUser = await User.findOne({email:req.body.email})
        if(selectedUser) return res.status(400).send('Email já existente.')

        const user = new User({
             name: req.body.name,
             email: req.body.email,
             password: bcrypt.hashSync(req.body.password) // usando bcrypt.hashSync para criptografia da senha.
        })
 
        try {
            const savedUser = await user.save()
            res.redirect('/user/login')
        } catch (error) {
            res.status(400).send(error)
        } 
        console.log("register")
    };
     

    

  const login = async ( req, res, next ) => {


        const {error} = loguinValidate(req.body)
        if (error){ return res.status(400).send(error)}


        const selectedUser = await User.findOne({email:req.body.email})
        if(!selectedUser) return res.redirect('/user/login')


        const passwordUserMetch = bcrypt.compareSync(req.body.password, selectedUser.password) 
         if (!passwordUserMetch) return res.status(400).send(ErrorEmailPassword)


         const token = jwt.sign({_id: selectedUser._id, admin: selectedUser.admin }, process.env.TOKEN_SECRET ) 
         
         res.cookie('authorizationToken', token,{
            secure:true,
            httpOnly: true,
        }).redirect('/')
        console.log("login")
    }


    const logout = async (req,res)=>{
        try{  
           res.clearCookie('authorizationToken')//função q limpa o cookie onde esta armazenado o token
            return res.status(200).redirect('/user/login')
        }catch(error){
            return res.status(500).send(error.message)
        }
    }

module.exports =  {logout , login , register , pageRegister , pageLogin, pageLogout } 