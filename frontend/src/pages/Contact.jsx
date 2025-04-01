import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>

      <div className='text-center text-2x1 pt-10 border-t'>
        <Title text1={'ENTRE EM '} text2={'CONTATO'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt='' />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-x1 text-gray-600'>Our Store</p>
          <p className='text-gray-500'>54709 wills station<br /> Suite 350,washington,USA</p>
          <p className='text-gray-500'>TEL:(415) 555-0132<br />Email:adminvcsempre@gmail.com</p>
          <p className='font-semibold text-xl text-gray-600'>TEL:(415) 555-0132<br />Email:adminvcsempre@gmail.com</p>
          <p className='font-semibold text-x1 text-gray-600'>Historico vc sempre</p>
          <p className='text-gray-500'>aprenda mais sobre nosso time e vagas de trabalho</p>
          <p className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore vagas</p>
        </div>
      </div>
      <NewsletterBox />

    </div>
  )
}

export default Contact
