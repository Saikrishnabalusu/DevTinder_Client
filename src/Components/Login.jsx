import React from 'react'
import { useState } from 'react'
import { BASE_URL } from '../Utils/constants'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { addUser } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('neeru@gmail.com')
    const [password, setPassword] = useState('Kittu@123')
    const navigate = useNavigate()
    // const loginUser = useSelector(store => store.user)
    const dispatch = useDispatch();
    const submitLogin = async () => {
        // Implement login logic here
        try {
            const payload = {
                email,
                password
            }
            const res = await axios.post(BASE_URL + "/login", payload, { withCredentials: true })

            console.log(res.data?.data);
            dispatch(addUser(res?.data?.data))
            navigate("/")
        } catch (error) {
            console.log(error.message);

        }
    }
    return (
        <div className="hero bg-base-200 min-h-screen min-w-2/3 p-0">
            <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-6xl gap-12">
                <div className="text-center lg:text-left w-[600px]">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6 text-red-300">
                        Because Every Great Project Needs the Right Pair.<br />
                        Match with developers who debug at 2 AM,<br />
                        love clean commits,<br />
                        and believe shipping beats perfection.<br />
                        Swipe. Sync. Ship. 🚀
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-md lg:max-w-lg xl:max-w-xl  shadow-2xl">
                    <div className="card-body">
                        <fieldset className="fieldset">
                            <label className="label">Email</label>
                            <input type="email" className="input border-neutral-100 border-1 px-1 w-full text-lg" placeholder="example@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <label className="label">Password</label>
                            <input type="password" className="input border-neutral-100 border-1 px-1 w-full text-lg" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
                            <div><a className="link link-hover">Forgot password?</a></div>
                            <button className="btn btn-neutral mt-4" onClick={submitLogin}>Login</button>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login