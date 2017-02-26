const express = require('express')
const router = express.Router()
const zineController = require('../controllers/zine_controller')
const authenticate = require('../authenticate')

router.get('/', authenticate.isNotLoggedIn, zineController.list)
router.get('/new', authenticate.isNotLoggedIn, zineController.new)
router.get('/:id', authenticate.isNotLoggedIn, zineController.listOne)
router.get('/:id/edit', authenticate.isNotLoggedIn, zineController.edit)
router.post('/', zineController.create)
router.put('/:id', zineController.update)
router.delete('/:id', zineController.delete)
router.put('/:id/remove', zineController.removePhotos)

module.exports = router
