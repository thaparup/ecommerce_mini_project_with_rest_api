import { useState } from 'react'
import Navbar from './components/Navbar/index'
import './App.css'
import Layout from './components/Layout'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {


  return (
    <>
      <Router>
        <Layout />

      </Router>

    </>
  )
}

export default App