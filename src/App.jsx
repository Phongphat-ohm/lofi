import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Nav from './component/nav'
import Home from './pages/home'
import Footer from './component/footer'
import Redirect from './pages/redireact'
import Register from './pages/register'
import AppMsc from './pages/app'
import DhHome from './pages/dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/register' Component={Register} />
        <Route path='/redirect' Component={Redirect} />
        <Route path='/app' Component={AppMsc} />
        <Route path='/dashboard' Component={DhHome} />
      </Routes>
      <Footer />
    </BrowserRouter>

  )
}

export default App
