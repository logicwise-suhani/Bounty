import { Route, Routes } from 'react-router-dom'
import './App.css'
import Customer from './components/Customer'
import Home from './components/Home'
import AdminDashboard from './components/AdminDashboard'
import Admin from './components/Admin'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create-bounty' element={<Admin />} />
        <Route path='/customer' element={<Customer />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
      </Routes>
    </>
  )
}

export default App
