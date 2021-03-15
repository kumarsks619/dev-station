import React from 'react'
import Moment from 'react-moment'

const ProfileEdu = ({
    education: { school, degree, fieldOfStudy, current, to, from, description },
}) => {
    return (
        <div>
            <h3>{school}</h3>
            <p>{fieldOfStudy}</p>
            <p>
                <Moment format="YYYY/MM/DD">{from}</Moment> -
                {current ? 'Now' : <Moment format="YYYY/MM/DD">{to}</Moment>}
            </p>
            <p>
                <strong>Position: </strong> {degree}
            </p>
            <p>
                <strong>Description: </strong> {description}
            </p>
        </div>
    )
}

export default ProfileEdu
