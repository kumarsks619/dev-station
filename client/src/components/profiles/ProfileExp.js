import React from 'react'
import Moment from 'react-moment'

const ProfileExp = ({
    experience: { company, title, location, current, to, from, description },
}) => {
    return (
        <div>
            <h3>{company}</h3>
            <p>{location}</p>
            <p>
                <Moment format="YYYY/MM/DD">{from}</Moment> -
                {current ? 'Now' : <Moment format="YYYY/MM/DD">{to}</Moment>}
            </p>
            <p>
                <strong>Position: </strong> {title}
            </p>
            <p>
                <strong>Description: </strong> {description}
            </p>
        </div>
    )
}

export default ProfileExp
