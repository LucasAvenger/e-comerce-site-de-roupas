import express from 'express'
import { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

//rotas pelo administrador
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

//rotas usadas para pagamento
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)

// rota usadas pelo usuario
orderRouter.post('/userorders', authUser, userOrders)

//verificação de pagamento
orderRouter.post('/verifyStripe', authUser, verifyStripe)

export default orderRouter