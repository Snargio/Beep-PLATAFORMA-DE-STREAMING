const userController = require('./controllers/userController')
const auth = require('./controllers/authController')
const express = require('express')
const router = express.Router()
var methodOverride = require('method-override')
const admVideosController = require('./controllers/VideosController')

//  User

router.get('/user/register', userController.pageRegister)
router.post('/user/register', userController.register)

router.get('/user/login', userController.pageLogin)
router.post('/user/login', userController.login)

router.get('/user/logout', auth, userController.pageLogout)
router.post('/user/logout', auth, userController.logout)

//  Videos Router

router.use(methodOverride('_method'))

router.get('/', auth, admVideosController.Allvideo)
router.get('/video/:id', auth, admVideosController.loadOnevideo)
router.get('/edit/:id', auth, admVideosController.loadvideo)
router.get('/add', auth, (req, res) => res.render('addVideo', { error: false }))

router.post(
  '/',
  auth,
  express.urlencoded({ extended: true }),
  admVideosController.addvideo
)
router.post(
  '/edit/:id',
  auth,
  express.urlencoded({ extended: true }),
  admVideosController.editvideos
)

router.delete('/:id', auth, admVideosController.deletevideo)
router.delete(
  '/',
  auth,
  express.urlencoded({ extended: true }),
  admVideosController.deletevideo
)

router.get(
  '/search',
  express.urlencoded({ extended: true }),
  admVideosController.search
)

module.exports = router
