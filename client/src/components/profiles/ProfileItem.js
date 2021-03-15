import React from 'react'
import { Link } from 'react-router-dom'

const ProfileItem = ({
    profile: {
        user: { _id, name, avatar },
        status,
        company,
        location,
        skills,
    },
}) => {
    return (
        <div className="profile bg-light">
            <img src={avatar} alt={name} className="round-img" />

            <div>
                <h2>{name}</h2>
                <p>
                    {status} at {company && company}
                </p>
                <p>{location}</p>
                <Link to={`/profile/${_id}`} className="btn btn-primary">
                    View Profile
                </Link>
            </div>

            <ul>
                <h3 className="text-primary">Top Skills</h3>
                {skills.slice(0, 4).map((skill, index) => (
                    <li className="text-primary" key={index}>
                        <i className="fas fa-check"></i> {skill}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ProfileItem
