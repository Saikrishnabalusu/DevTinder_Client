// import React, { useState } from 'react'
import UserList from './UserList'
import { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../Utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { setConnections } from '../reducers/connectionsReducer'

const Connections = () => {
    // const [connections, setConnections] = useState([])
    const myConnections = useSelector(state => state.connections.connections) || []
    const dispatch = useDispatch();
    useEffect(() => {
        const getReviewRequests = async () => {
            // make an API call to get the pending requests for the login user
            axios.get(BASE_URL + "/connections", { withCredentials: true })
                .then(res => {
                    // console.log("pending requests...", res?.data)
                    setConnections(res?.data?.data)
                    return res?.data?.data
                }).then(data => {
                    dispatch(setConnections(data));
                })
                .catch(err => {
                    console.log("Error while fetching connections...", err)
                })

        }
        getReviewRequests()
    }, [])

    return (
        <ul className="list bg-base-300 rounded-box shadow-md mt-24 flex flex-col gap-4 max-w-2/3 mx-auto">

            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Your Connections</li>
            {myConnections.length >= 0 && myConnections.map((connection) =>
                <UserList key={connection._id} profileUrl={connection.profileUrl} firstName={connection.firstName} lastName={connection.lastName} gender={connection.gender} age={connection.age} skills={connection.skills} listControls={false} />)}

        </ul>
    )
}

export default Connections