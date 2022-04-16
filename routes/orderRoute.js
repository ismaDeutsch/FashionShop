const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController.js')
const {verifyToken, verifyIsAdmin, verifyAuthorisation} = require('../middleware/verifyAuth')

router.post('/', orderController.create)
router.put('/:id', verifyIsAdmin, orderController.update)
router.delete('/:id', verifyIsAdmin, orderController.delete)
router.get('/', verifyIsAdmin, orderController.collectAll)
router.get('/find/:id', orderController.collectOne)
router.get('/income', verifyIsAdmin, orderController.income)
router.get('/sales', verifyIsAdmin, orderController.sales)

module.exports = router