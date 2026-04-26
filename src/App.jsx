
import { Route, useNavigate } from 'react-router-dom'
import './App.css'
import Body from './Components/Body'
import Feed from './Components/Feed'
import { Profile } from './Components/Profile'
import Login from './Components/Login'
import { Routes } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function App() {
  const navigate = useNavigate();
  const loginUser = useSelector(state => state.user.value)

  return (
    <>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/Login" element={<Login />} />
          <Route index element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App
