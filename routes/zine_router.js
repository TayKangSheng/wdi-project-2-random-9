const express = require('express')
const router = express.Router()
const zineController = require('../controllers/zine_controller')

router.get('/', zineController.list)
router.get('/new', zineController.new)
router.get('/:id', zineController.listOne)
router.get('/:id/edit', zineController.edit)
router.post('/', zineController.create)
router.put('/:id', zineController.update)
router.delete('/:id', zineController.delete)

module.exports = router
