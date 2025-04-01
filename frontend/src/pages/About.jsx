import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets';

//4:56
const About = () => {
    return (
        <div>

            <div className='text-2x1 text-center pt-8 border-t'>
                <Title text1={'SOBRE'} text2={'NÓS'} />
            </div>
            <div className='my-10 flex flex-col md:flex-row gap-16'>
                <img className='w-full md:max-w-[450px]' src={assets.about_img} alt='' />
                <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque ipsa nulla deserunt nihil exercitationem placeat minus ipsum sed, quibusdam dolorem, necessitatibus aspernatur vitae ut deleniti animi quo porro, quod facere?</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi quaerat minus sapiente ullam numquam, est iusto in iure laborum, nihil fugit voluptate reprehenderit, quis quo velit amet ratione? Quasi, autem.</p>
                    <b className='text-gray-800'>Nossa Missão</b>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil quos fugiat corporis libero dolor quis nemo. Tenetur, incidunt. Modi, consequatur consectetur beatae sint maxime dicta laboriosam soluta repudiandae eaque magni?</p>
                </div>
            </div>
            <div className='text-4x1 py-4'>
                <Title text1={'MELHOR'} text2={'ESCOLHA'} />
            </div>
            <div className='flex flex-col md:flex-row text-sm mb-20'>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
                    <b> Garantia de Qualidade</b>
                    <p className='text-gray-600 '> Lorem ipsum dolor sit amet consectetur a?</p>
                </div>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
                    <b>Conveniencia</b>
                    <p className='text-gray-600 '> Lorem ipsum dolor sit amet consectetur a?</p>
                </div>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
                    <b> Serviço CUSTOMIZADO</b>
                    <p className='text-gray-600 '> Lorem ipsum dolor sit amet consectetur a?</p>
                </div>
            </div>
        </div>

    )
}

export default About
