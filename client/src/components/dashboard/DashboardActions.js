import React from 'react'
import { Link } from 'react-router-dom'

const DashboardActions = () => {
    return (
        <div className="dash-buttons">
            <Link to="/create-profile?edit=true" className="btn">
                <i className="fas fa-user-circle text-primary"></i> Edit Profile
            </Link>
            <Link to="/add-experience" className="btn">
                <i className="fab fa-black-tie text-primary"></i> Add Experience
            </Link>
            <Link to="/add-education" className="btn">
                <i className="fas fa-graduation-cap text-primary"></i> Add Education
            </Link>
        </div>
    )
}

export default DashboardActions
