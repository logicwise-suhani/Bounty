import { Route, Routes } from 'react-router-dom'
import './App.css'
import Customer from './components/Customer/Customer'
import Home from './components/Admin/Home'
import AdminDashboard from './components/Admin/AdminDashboard'
import Admin from "./components/Admin/Admin"
import ShowAvailableRounds from './components/Customer/AvailableRounds'
import ResultTime from './components/Customer/ResultTime'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create-bounty' element={<Admin />} />
        <Route path='/customer' element={<Customer />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path='/available-rounds' element={<ShowAvailableRounds />} />
      </Routes>

      <ResultTime />
    </>
  )
}

export default App
