const express = require('express')
const router = express.Router();
var methodOverride = require('method-override')
const auth = require('../controllers/authController');



const admVideosController = require('../controllers/VideosController')

router.use(methodOverride('_method'));

router.get('/video/:id',auth, admVideosController.loadOnevideo )
router.get('/',auth, admVideosController.Allvideo);
router.get('/edit/:id',auth, admVideosController.loadvideo);
router.get('/add',auth, (req , res) => res.render('addVideo', {error: false}));

router.post('/',auth, express.urlencoded({ extended: true }), admVideosController.addvideo ); // rota Post que está executando o objeto addPranchinhas lá do controller e usando express.urlencoded para captar formulários.  
router.post('/edit/:id',auth, express.urlencoded({ extended: true }), admVideosController.editvideos)

router.delete('/:id',auth, admVideosController.deletevideo)
router.delete('/',auth, express.urlencoded({extended: true}), admVideosController.deletevideo )

router.get('/search',express.urlencoded({ extended: true }), admVideosController.search )

module.exports = router