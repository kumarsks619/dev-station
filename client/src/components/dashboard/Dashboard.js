import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { profileGetCurrent } from '../../store/actions/profile'
import Loader from '../layout/Loader'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'
import { accountDelete } from '../../store/actions/profile'

const Dashboard = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { userProfile, isLoading } = useSelector((state) => state.profile)

    useEffect(() => {
        dispatch(profileGetCurrent())
    }, [dispatch])

    const handleAccountDelete = () => dispatch(accountDelete())

    return isLoading && userProfile === null ? (
        <Loader />
    ) : (
        <div>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Welcome {user && user.name}
            </p>

            {userProfile ? (
                <>
                    <DashboardActions userID={user._id} />
                    <Experience experiences={userProfile.experience} />
                    <Education educations={userProfile.education} />

                    <div className="my-2">
                        <button className="btn btn-danger" onClick={handleAccountDelete}>
                            <i className="fas fa-user-minus"></i> Delete My Account
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <p>You haven't setup you profile yet! Please add some info.</p>
                    <Link to="/create-profile" className="btn btn-primary my-1">
                        <i className="fas fa-user-circle"></i> Create Profile
                    </Link>
                </>
            )}
        </div>
    )
}

export default Dashboard
