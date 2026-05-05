import React, { useEffect, useState } from 'react'
import axios from "axios"
import { BASE_URL } from '../Utils/constants'
import Card from './Card'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed, removeFeedUser } from '../reducers/feedReducer'
// import { data } from 'react-router-dom'

const Feed = () => {
    // const [users, setUsers] = useState([])

    const feedUsers = useSelector(state => state.feed.users)
    const dispatch = useDispatch()
    const getUsers = async () => {
        axios.get(`${BASE_URL}/feed`, { withCredentials: true }).then((res) => {

            // setUsers(res?.data?.data)
            dispatch(addFeed(res?.data?.data))
            // return (res?.data?.data || null)
        }).catch((e) => console.log(e.message))

    }
    useEffect(() => {
        getUsers();
    }, [])

    const handleInterested = async (toUserId) => {
        axios.post(`${BASE_URL}/connection/interested/${toUserId}`, {}, { withCredentials: true }).then(
            (res) => {
                // console.log("Interested Click status", res.data);
                dispatch(removeFeedUser(toUserId))
            }
        )
    }
    const handleIgnored = async (toUserId) => {
        axios.post(`${BASE_URL}/connection/ignored/${toUserId}`, {}, { withCredentials: true }).then(
            (res) => {
                // console.log("Interested Click status", res.data);
                dispatch(removeFeedUser(toUserId))
            }
        )
    }

    return (
        <div className="feedContainer w-full h-full bg-base-900 flex justify-center items-center gap-4 flex-wrap mt-16 pt-4">
            {!feedUsers.length === 0 ? "loading..." : (feedUsers.map(user => {
                return <Card key={user._id} id={user._id} firstName={user?.firstName} lastName={user?.lastName} age={user?.age} about={user?.about} skills={user?.skills} gender={user?.gender} profileUrl={user?.profileUrl} showButton={true} handleInterested={handleInterested} handleIgnored={handleIgnored} />
            }))}
        </div>
    )
}

export default Feed