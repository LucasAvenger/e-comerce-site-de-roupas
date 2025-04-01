import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
//reacttoastify para respostas de erro ou sucesso
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//aqui vc está passando todas as rotas de admin e repassando suas funçoes

//8:01
export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '$'

const App = () => {

  //impedir logout vai pegar token do historico local
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])


  return (
    //token em Route adicionara seu token de login a pagina e manterá seu login até que você queira deslogar
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      {token === ""
        ? <Login setToken={setToken} />
        :
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className='flex w-full'>
            <Sidebar />
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
              <Routes>

                <Route path='/add' element={<Add token={token} />} />
                <Route path='/list' element={<List token={token} />} />
                <Route path='/orders' element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default App
