import React from 'react'
// import { useState } from 'react'

const Card = ({ id, firstName, lastName, age, about, skills, gender, profileUrl, showButton = false, handleIgnored, handleInterested }) => {

    return (
        <div className="card bg-base-200 w-2/12 h-96 shadow-sm">
            <figure className='h-1/2'>
                <img
                    src={profileUrl}
                    alt="profile pic" className='full object-contain' />
            </figure>
            <div className="card-body">
                <h2 className="card-title font-bold text-xl">{firstName + " " + lastName}</h2>
                <span>{age} | {gender}</span>
                <p> {skills} </p>
                <p className="text-wrap">{about}</p>
                {showButton && (<div className="card-actions justify-center">
                    <button className="btn btn-warning p-2" onClick={() => handleIgnored(id)}>Ignored</button>
                    <button className="btn btn-success p-2" onClick={() => handleInterested(id)}>Interested</button>

                </div>)}
            </div>
        </div>
    )
}

export default Card