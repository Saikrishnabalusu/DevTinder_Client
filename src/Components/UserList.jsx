import React from 'react'

const UserList = ({ profileUrl, firstName, lastName, gender, age, skills, listControls = true }) => {
    return (
        <li className="list-row w-full">
            <div><img className="size-10 rounded-box" src={profileUrl} /></div>
            <div>
                <div>{firstName + " " + lastName}</div>
                <div className="text-xs uppercase font-semibold opacity-60">{gender} | {age} | Skills : {skills.join(", ") || "N/A"}</div>
                {/* <div className="text-xs uppercase font-semibold opacity-60">Remaining Reason</div> */}
            </div>
            {listControls && (
                <>
                    <button className="btn btn-success">Accept</button>
                    <button className="btn btn-error">Reject</button>
                </>
            )}
        </li>
    )
}

export default UserList