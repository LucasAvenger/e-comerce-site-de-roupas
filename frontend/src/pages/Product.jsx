import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';


const Product = () => {

    const { productId } = useParams();
    const { products, currency, addToCart } = useContext(ShopContext);
    const [productData, setProductData] = useState(false);
    const [image, setImage] = useState('')
    const [size, setSize] = useState('')


    const fetchProductData = async () => {

        products.map((item) => {
            if (item._id === productId) {
                setProductData(item)
                setImage(item.image[0])
                return null;
            }
        })

    }
    useEffect(() => {
        fetchProductData();
    }, [productId, products])

    return productData ? (
        <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 0pacity-100' >

            {/* ------produto---------*/}
            <div className='flex gap-12 flex-col sm:flex-row'>
                {/* --------imagens do produto-------*/}
                <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
                    <div className='flex flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
                        {
                            productData.image.map((item, index) => (
                                <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
                            ))
                        }
                    </div>
                    <div className='w-full sm:w-[80%]'>
                        <img className='w-full h-auto' src={image} alt='' />
                    </div>
                </div>
                {/*-------informações do produto------- */}
                <div className='flex-1'>
                    <h1 className='font-medium text2x1 mt-2'>{productData.name}</h1>
                    <div className='flex items-center gap-1 mt-2'>
                        <img src={assets.star_icon} alt='' className='w-3 5' />
                        <img src={assets.star_icon} alt='' className='w-3 5' />
                        <img src={assets.star_icon} alt='' className='w-3 5' />
                        <img src={assets.star_icon} alt='' className='w-3 5' />
                        <img src={assets.star_dull_icon} alt='' className='w-3 5' />
                        <p className='pl-2'>(122)</p>
                    </div>
                    <p className='mt-5 text-3x1 font-medium'> {currency}{productData.price}</p>
                    <p className='mt-5 tect-gray-500 md:w-4/5'>{productData.description}</p>
                    <div className='flex flex-col gap-4 my-8'>
                        <p>select size</p>
                        <div className='flex gap-2'>
                            {productData.sizes.map((item, index) => (
                                <button onClick={() => setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
                            ))}
                        </div>
                    </div>
                    <button onClick={() => addToCart(productData._id, size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADICIONAR AO CARRINHO</button>
                    <hr className='mt-8 sm:w-4/5' />
                    <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                        <p>produtos 100% originais</p>
                        <p>entrega avaliavel</p>
                        <p>retorno e troca em até 7 dias</p>
                    </div>
                </div>
            </div>
            descrição
            {/* seção de review */}
            <div className='mt-20'>
                <div className='flex'>
                    <p className='border px-5 py-3 text-sm'> Descrição da compra</p>
                    <p className='border px-5 py-3 text-sm'>Revisão(122)</p>
                </div>
                <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500 '>
                    <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, optio? Esse, debitis hic earum veritatis vitae voluptatibus exercitationem quae magni tempore perspiciatis quisquam sint culpa quia cumque provident sed soluta?</p>
                    <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo accusamus tempore ducimus id, excepturi autem magni atque laudantium nemo tenetur fugit sint quis ex consequatur earum consequuntur libero voluptatem nisi?</p>
                </div>
            </div>
            {/** repassar produtos escolhidos */}
            <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
        </div>
    ) : <div className='opacity -0'></div>
}

export default Product