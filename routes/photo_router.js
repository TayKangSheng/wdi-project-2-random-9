const express = require('express')
const router = express.Router()
const photoController = require('../controllers/photo_controller')

router.get('/', photoController.list)
router.get('/new', photoController.new)
router.get('/:id', photoController.listOne)
router.get('/:id/edit', photoController.edit)
router.post('/', photoController.create)
router.put('/:id', photoController.update)
router.delete('/:id', photoController.delete)

module.exports = router
