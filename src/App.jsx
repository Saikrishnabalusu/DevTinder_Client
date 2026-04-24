
import { Route } from 'react-router-dom'
import './App.css'
import Body from './Components/Body'
import Home from './Components/Home'
import { Profile } from './Components/Profile'
import Login from './Components/Login'
import { Routes } from 'react-router-dom'

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/Login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App
