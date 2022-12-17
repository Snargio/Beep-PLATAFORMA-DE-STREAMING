const express = require('express')
const router = express.Router();
const auth = require('../controllers/authController')


router.get('/', auth, (req , res ) => {


   if( req.user.admin ){   
     res.render('adm')
   }else{
     res.status(401).send("Not admim: Acces Denied")
   }


})

module.exports = router;
