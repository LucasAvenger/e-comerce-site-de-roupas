import React, { useContext, useState } from 'react'
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';





const PlaceOrder = () => {

    const [method, setMethod] = useState('cod');
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext)

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })


    //validando formulario  do pedido 
    //requisitando campos do formulário =formData
    //10:56
    // quando os camopos de validação forem preenchidos 
    //os dados serão pegos  event.target

    const onChangeHandler = (event) => {
        //10:57
        const name = event.target.name;
        const value = event.target.value

        //e serão colocados dentro de um formulário = setFormData

        setFormData(data => ({ ...data, [name]: value }))

    }
    //11:05
    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {
            let orderItems = []
            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items))
                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }

            switch (method) {

                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })

                    if (response.data.success) {
                        setCartItems({})
                        navigate('/orders')
                    } else {
                        toast.error(response.data.message)
                    }
                    break;
                case 'stripe':
                    const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } })
                    if (responseStripe.data.success) {
                        const { session_url } = responseStripe.data
                        window.location.replace(session_url)
                    } else {
                        toast.error(responseStripe.data.message)
                    }

                    break;

                default:
                    break;

            }



        } catch (error) {
            console.log(error)
            toast.error(error.message)

        }
    }

    //pegando imformações totais do valor de compra para prosseguir para pagamento

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-14 min-h-[80vh] border-t'>
            {/** lado esquerdo */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1={'INFORMAÇÕES DE '} text2={'ENTREGA'} />
                </div>
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rouded p-y-1.5 px-3.5 w-full ' type='text' placeholder='First name' />
                    <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rouded p-y-1.5 px-3.5 w-full ' type='text' placeholder='Last name' />
                </div>
                <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rouded p-y-1.5 px-3.5 w-full ' type='email' placeholder='Email address' />
                <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rouded p-y-1.5 px-3.5 w-full ' type='text' placeholder='Street' />
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rouded p-y-1.5 px-3.5 w-full ' type='text' placeholder='City' />
                    <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rouded p-y-1.5 px-3.5 w-full ' type='text' placeholder='State' />
                </div>
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rouded p-y-1.5 px-3.5 w-full ' type='number' placeholder='Zipcode' />
                    <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rouded p-y-1.5 px-3.5 w-full ' type='text' placeholder='Country' />
                </div>
                <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded p-y-1.5 px-3.5 w-full ' type='number' placeholder='Phone' />
            </div>
            {/** lado esquerdo */}
            <div className='mt-8'>
                <div className='mt-8 min-w-80'>
                    <CartTotal />
                </div>

                <div className='mt-12'>
                    <Title text1={'METODO DE '} text2={'PAGAMENTO'} />
                    <div className='flex gap-3 flex-col lg:flex-row'>
                        <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                            <p className='text-gray-500 text-sm font-medium mx-4'>Cartão de crédito</p>
                        </div>

                        <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                            <p className='text-gray-500 text-sm font-medium mx-4'> Dinheiro na entrega</p>
                        </div>
                    </div>
                    <div className='w-full text-end mt-8'>
                        <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>Pagar</button>

                    </div>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder