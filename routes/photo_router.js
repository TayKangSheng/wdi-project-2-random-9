const express = require('express')
const router = express.Router()
const photoController = require('../controllers/photo_controller')
const authenticate = require('../authenticate')

const multer = require('multer')
const upload = multer({ dest: './uploads/'})

router.get('/', photoController.list)
router.get('/new', authenticate.isNotLoggedIn, photoController.new)
router.get('/:id', authenticate.isNotLoggedIn, photoController.listOne)
router.get('/:id/edit', authenticate.isNotLoggedIn, photoController.edit)
router.post('/', upload.single('url'), photoController.create)
router.put('/:id', upload.single('url'), photoController.update)
router.delete('/:id', photoController.delete)
router.get('/:id/add', authenticate.isNotLoggedIn, photoController.addToExistingZine)
router.get('/:id/new', authenticate.isNotLoggedIn, photoController.addToNewZine)
router.put('/:id/addtozine', photoController.updateZine)
router.post('/:id/newzine', photoController.newZine)

module.exports = router
