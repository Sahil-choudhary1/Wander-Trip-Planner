import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import MyTrips from './pages/MyTrips'
import CreateTrip from './pages/CreateTrip'
import ViewTrip from './pages/ViewTrip'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/my-trips" element={<MyTrips />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/view-trip/:id" element={<ViewTrip />} />
      </Routes>
    </BrowserRouter>
  )
}
