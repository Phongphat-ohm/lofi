import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Nav from './component/nav'
import Home from './pages/home'
import Footer from './component/footer'
import Redirect from './pages/redireact'
import Register from './pages/register'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/register' Component={Register} />
        <Route path='/redirect' Component={Redirect} />
      </Routes>
      <Footer />
    </BrowserRouter>

  )
}

export default App
