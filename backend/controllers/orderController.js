import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js';  // Certifique-se de que o caminho está 
import Stripe from 'stripe'

//variaveis globais
const currency = 'inr'
const deliveryCharge = 10

//usando chave stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
//10:40
const placeOrder = async (req, res) => {

    //10:51

    //aqui vc está pegando os dados do userModel 
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()
        //limpar dados do carrinho ao clicar em ir para a pagina de pagamento/pagar
        await userModel.findByIdAndUpdate(userId, { cartData: {} })
        //mensagem de sucesso de pedido
        res.json({ success: true, message: "Pedido feito" })

    } catch (error) {
        //mensagem de erro ao gerar pedido
        console.log(error)
        res.json({ success: false, message: error.message })

    }

}

//colocando pedidos usando metodo stripe
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1

        })
        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }

}
//12:31
//verificação do stripe
const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body
    try {
        if (success = "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.json({ success: true });
        }
        else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }
}


// colocando pedidos usando metodo Rzorpay
const placeOrderRazorpay = async (req, res) => {

}

// Todos os dados do pedido de painel do administrador
const allOrders = async (req, res) => {

    try {

        const orders = await orderModel.find({})
        res.json({ success: true, orders })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

//Dados do pedido do usuario do fronteEnd

const userOrders = async (req, res) => {

    try {

        const { userId } = req.body

        const orders = await orderModel.find({ userId })

        res.json({ success: true, orders })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }
}

// atualizar pedido do painel do administrador
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body

        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: 'Status Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }
}


export { verifyStripe, placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus }