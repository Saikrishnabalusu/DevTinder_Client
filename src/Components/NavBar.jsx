import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../Utils/constants';
import { removeUser } from '../reducers/userReducer';

const NavBar = () => {
    const loginUser = useSelector(state => state.user.value);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await axios.post(BASE_URL + "/logout", {}, { withCredentials: true })
        dispatch(removeUser())
        navigate("/login")
    }
    return (
        <div className="navbar bg-base-300 shadow-sm ">
            <div className="flex-1">
                <Link to={"/"} className="btn btn-ghost text-xl">DevTinder</Link>
            </div>
            <div className="flex gap-3 mx-2">
                {loginUser && (<input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />)}
                {loginUser && (<div className="dropdown dropdown-end mx-2">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={loginUser?.profileUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
                        </div>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <Link to={"/profile"} className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li><Link to={"/Myconnections"}>My Connections</Link></li>
                        <li><Link to={"/ReviewRequests"}>Review Requests</Link></li>
                        <li><Link onClick={handleLogout}>Logout</Link></li>
                    </ul>
                </div>)}
            </div>
        </div>
    )
}

export default NavBar