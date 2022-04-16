const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController.js')
const {verifyToken, verifyIsAdmin, verifyAuthorisation} = require('../middleware/verifyAuth')

router.post('/', verifyToken, cartController.create)
router.put('/:id', verifyAuthorisation, cartController.update)
router.delete('/:id', verifyAuthorisation, cartController.delete)
router.get('/', verifyIsAdmin, cartController.collectAll)
router.get('/:id', verifyAuthorisation, cartController.collectOne)

module.exports = router