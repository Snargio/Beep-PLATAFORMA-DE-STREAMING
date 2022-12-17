const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../controllers/authController');

router.get('/logout',auth, userController.pageLogout);
router.get('/register', userController.pageRegister);
router.get('/login', userController.pageLogin);

router.post('/register',express.urlencoded({extended:true}), userController.register);

router.post('/login',express.urlencoded({extended:true}),userController.login);

router.post('/logout',auth, express.urlencoded({extended:true}),userController.logout)



module.exports = router;
