import React from 'react'
import { assets } from '../assets/assets'

const footer = () => {
  return (
    <div >
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
          <img src={assets.logo} className='mb-5 w-32' alt='' />
          <p className='w-full md:w-2/3 text-gray-600'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum labore saepe cumque ducimus ex temporibus facilis, eligendi praesentium culpa voluptas excepturi nobis? Laboriosam fuga commodi tenetur laudantium minus voluptas asperiores?
          </p>
        </div>
        <div>
          <p className='text- font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600 '>
            <li>Inicio</li>
            <li>Sobre</li>
            <li>Deliveri</li>
            <li>Politica de privacidade</li>
          </ul>
        </div>
        <div>
          <p className='text-xl font-medium mb-5'>Entre em contato</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+1-212-456-7890</li>
            <li>contatovocêsempre@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Cpyright 2024 vocêsempre.com - todos os direitos reservados</p>
      </div>
    </div>
  )
}

export default footer
