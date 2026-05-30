import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../Utils/constants'
import { useDispatch } from 'react-redux'
import { removePendingRequest } from '../reducers/requestReducer'

const UserList = ({ id, profileUrl, firstName, lastName, gender, age, skills, listControls = true }) => {

    const dispatch = useDispatch()

    const handleClick = async (id, type) => {
        try {
            console.log(id, "request Accepted")
            await axios.post(`${BASE_URL}/review/${type}/${id}`, {}, { withCredentials: true });
            dispatch(removePendingRequest({ id }))

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <li className="list-row w-full">
            <div><img className="size-10 rounded-box" src={profileUrl} /></div>
            <div>
                <div>{firstName + " " + lastName}</div>
                <div className="text-xs uppercase font-semibold opacity-60">{gender} | {age} | Skills : {skills?.length ? skills.join(", ") : "N/A"}</div>
                {/* <div className="text-xs uppercase font-semibold opacity-60">Remaining Reason</div> */}
            </div>
            {listControls && (
                <>
                    <button className="btn btn-success" onClick={() => handleClick(id, "accepted")}>Accept</button>
                    <button className="btn btn-error" onClick={() => handleClick(id, "rejected")}>Reject</button>
                </>
            )}
        </li>
    )
}

export default UserList