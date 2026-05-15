
import { Route } from 'react-router-dom'
import './App.css'
import Body from './Components/Body'
import Feed from './Components/Feed'
import { Profile } from './Components/Profile'
import Login from './Components/Login'
import Connections from './Components/Connections'
import ReviewRequests from './Components/ReviewRequests'
// import { useNavigate } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from './Utils/constants'
import { useDispatch } from 'react-redux'
import { addUser } from './reducers/userReducer'
// import { useNavigate } from 'react-router-dom'


function App() {
  const dispatch = useDispatch()
  const getLoginUser = async () => {
    const res = await axios.get(BASE_URL + "/profile", { withCredentials: true })
    dispatch(addUser(res?.data?.data))
  }
  useEffect(() => {
    getLoginUser()
  })
  return (
    <>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/Login" element={<Login />} />
          <Route index element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/Myconnections" element={<Connections />} />
          <Route path="/ReviewRequests" element={<ReviewRequests />} />
        </Route>
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App
