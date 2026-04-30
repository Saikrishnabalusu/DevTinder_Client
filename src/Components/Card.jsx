import React from 'react'

const Card = ({ firstName, lastName, age, about, skills, gender, profileUrl }) => {
    return (
        <div className="card bg-base-200 w-1/2 shadow-sm">
            <figure>
                <img
                    src={profileUrl}
                    alt="profile pic" />
            </figure>
            <div className="card-body">
                <h2 className="card-title font-bold text-xl">{firstName + " " + lastName}</h2>
                <span>{age} | {gender}</span>
                <p> {skills} </p>
                <p className="text-wrap">{about}</p>

            </div>
        </div>
    )
}

export default Card