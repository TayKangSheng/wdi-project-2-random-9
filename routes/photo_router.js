const express = require('express')
const router = express.Router()
const photoController = require('../controllers/photo_controller')

const multer = require('multer')
const upload = multer({ dest: './uploads/'})

router.get('/', photoController.list)
router.get('/new', photoController.new)
router.get('/:id', photoController.listOne)
router.get('/:id/edit', photoController.edit)
router.post('/', upload.single('url'), photoController.create)
router.put('/:id', upload.single('url'), photoController.update)
router.delete('/:id', photoController.delete)

module.exports = router
