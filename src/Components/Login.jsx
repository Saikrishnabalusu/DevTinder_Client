import React from 'react'
import { useState } from 'react'
import { BASE_URL } from '../Utils/constants'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'
import Alert from './Alert'

const Login = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('neeru@gmail.com')
    const [password, setPassword] = useState('Kittu@123')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState('')
    const [alertType, setAlertType] = useState('info')
    const [formType, setFormType] = useState('login')
    const navigate = useNavigate()
    const dispatch = useDispatch();


    const submitLogin = () => {
        setAlertMsg('')
        setShowAlert(false);
        try {
            const payload = {
                email,
                password
            }
            setShowAlert(false);
            axios.post(BASE_URL + "/login", payload, { withCredentials: true }).then((res) => {
                setAlertMsg(res.data?.message || "Login successful");
                setAlertType("success");
                setShowAlert(true);
                dispatch(addUser(res?.data?.data))
                navigate("/")
            }).catch((err) => {
                setAlertMsg(err.response?.data || "An error occurred");
                setAlertType("error");
                setShowAlert(true);
            });


        } catch (error) {
            // console.log(error.message);
            setAlertMsg(error?.response?.data || error.message || 'An error occurred. Please try again.')
            setAlertType("error");
            setShowAlert(true);
        }
    }
    const handleSignup = () => {
        setAlertMsg('')
        setShowAlert(false);
        setFormType('signup')
        try {
            const payload = {
                firstName,
                lastName,
                email,
                password,
                age,
                gender
            }
            setShowAlert(false);
            axios.post(BASE_URL + "/signup", payload, { withCredentials: true }).then((res) => {
                setAlertMsg(res.data?.message || "SignUp successful");
                setAlertType("success");
                setShowAlert(true);
                dispatch(addUser(res?.data?.data))
                navigate("/profile")
            }).catch((err) => {
                setAlertMsg(err.response?.data || "An error occurred");
                setAlertType("error");
                setShowAlert(true);
            });


        } catch (error) {
            // console.log(error.message);
            setAlertMsg(error?.response?.data || error.message || 'An error occurred. Please try again.')
            setAlertType("error");
            setShowAlert(true);
        }
    }

    return (<>{showAlert && <Alert message={alertMsg} type={alertType} />}
        <div className="hero bg-base-200 min-h-screen min-w-2/3 p-0">
            <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-6xl gap-12">
                <div className="text-center lg:text-left w-[600px]">
                    <h1 className="text-5xl font-bold">{formType === "login" ? "Login now!" : "Sign Up Now!"}</h1>
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
                            {formType === "signup" && (<><label className="label">First Name</label>
                                <input type="text" className="input border-neutral-100 border-1 px-1 w-full text-lg" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                <label className="label">Last Name</label>
                                <input type="text" className="input border-neutral-100 border-1 px-1 w-full text-lg" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} /></>)}
                            <label className="label">Email</label>
                            <input type="email" className="input border-neutral-100 border-1 px-1 w-full text-lg" placeholder="example@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <label className="label">Password</label>
                            <input type="password" className="input border-neutral-100 border-1 px-1 w-full text-lg" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
                            {formType === "signup" && (<><div><a className="link link-hover">Forgot password?</a></div>
                                <label className="label">Age</label>
                                <input type="number" className="input border-neutral-100 border-1 px-1 w-full text-lg" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
                                <label className="label">Gender</label>
                                <input type="text" className="input border-neutral-100 border-1 px-1 w-full text-lg" placeholder="Gender" value={gender} onChange={(e) => setGender(e.target.value)} /></>)}

                            <button className="btn btn-neutral mt-4" onClick={formType === "login" ? submitLogin : handleSignup}>{formType === "login" ? "Login" : "Sign Up"}</button>

                        </fieldset>
                        <p className='text-left text-orange-500 cursor-pointer' onClick={() => setFormType("signup")}>Not already a member? SignUp Now</p>
                    </div>
                </div>
            </div>
        </div></>
    )
}

export default Login