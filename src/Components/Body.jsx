import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Body = () => {
    const navigate = useNavigate();
    const loginUser = useSelector(state => state.user.value)

    useEffect(() => {
        if (!loginUser) {
            navigate('/Login')
        }
    }, [])


    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
}

export default Body