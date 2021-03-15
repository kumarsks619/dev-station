import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Loader from '../layout/Loader'
import { profileGetAll } from '../../store/actions/profile'
import ProfileItem from './ProfileItem'

const Profiles = () => {
    const dispatch = useDispatch()
    const { profiles, isLoading } = useSelector((state) => state.profile)

    useEffect(() => {
        dispatch(profileGetAll())
    }, [dispatch])

    return isLoading ? (
        <Loader />
    ) : (
        <>
            <h1 className="large text-primary">Community</h1>
            <p className="lead">
                <i className="fab fa-connectdevelop"></i> Browse and connect with
                developers
            </p>

            <div className="profiles">
                {profiles.length > 0 ? (
                    profiles.map((profile) => (
                        <ProfileItem key={profile._id} profile={profile} />
                    ))
                ) : (
                    <h4>Community seems to empty for now...</h4>
                )}
            </div>
        </>
    )
}

export default Profiles
