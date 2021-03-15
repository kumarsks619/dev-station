import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../layout/Loader'
import { profileGetByID } from '../../store/actions/profile'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExp from './ProfileExp'
import ProfileEdu from './ProfileEdu'
import ProfileGithub from './ProfileGithub'

const Profile = ({ match }) => {
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)
    const { userProfile, isLoading } = useSelector((state) => state.profile)

    const userID = match.params.userID

    useEffect(() => {
        dispatch(profileGetByID(userID))
    }, [dispatch, userID])

    return isLoading || userProfile === null ? (
        <Loader />
    ) : (
        <>
            <Link to="/profiles" class="btn">
                Back To Profiles
            </Link>

            {auth.isAuth && !auth.isLoading && auth.user._id === userProfile.user._id && (
                <Link to="/create-profile?edit=true" className="btn">
                    <i className="fas fa-user-circle text-primary"></i> Edit Profile
                </Link>
            )}

            <div class="div profile-grid my-1">
                <ProfileTop profile={userProfile} />
                <ProfileAbout profile={userProfile} />

                {/* Experience */}
                <div class="profile-exp bg-white p-2">
                    <h2 class="text-primary">Experience</h2>
                    {userProfile.experience.length > 0 ? (
                        userProfile.experience.map((exp) => (
                            <ProfileExp experience={exp} />
                        ))
                    ) : (
                        <h4>No experience credentials.</h4>
                    )}
                </div>

                {/* Education */}
                <div class="profile-edu bg-white p-2">
                    <h2 class="text-primary">Education</h2>
                    {userProfile.education.length > 0 ? (
                        userProfile.education.map((edu) => <ProfileEdu education={edu} />)
                    ) : (
                        <h4>No education credentials.</h4>
                    )}
                </div>

                {/* Github Repos */}
                {userProfile.githubUsername && (
                    <ProfileGithub githubUsername={userProfile.githubUsername} />
                )}
            </div>
        </>
    )
}

export default Profile
