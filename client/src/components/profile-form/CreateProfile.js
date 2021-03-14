import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { profileCreateUpdate } from '../../store/actions/profile'

const CreateProfile = ({ history, location: routerLocation }) => {
    const dispatch = useDispatch()
    const { userProfile, isLoading } = useSelector((state) => state.profile)

    const edit = routerLocation.search ? routerLocation.search.split('edit=')[1] : false

    const [formData, setFormData] = useState({
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubUsername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
    })
    const [showSocialInputs, setShowSocialInputs] = useState(false)

    const {
        company,
        website,
        location,
        status,
        skills,
        githubUsername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram,
    } = formData

    useEffect(() => {
        if (!isLoading && userProfile) {
            setFormData({
                company: userProfile.company ? userProfile.company : '',
                website: userProfile.website ? userProfile.website : '',
                location: userProfile.location ? userProfile.location : '',
                status: userProfile.status ? userProfile.status : '',
                skills: userProfile.skills.length > 0 ? userProfile.skills.join(',') : '',
                githubUsername: userProfile.githubUsername
                    ? userProfile.githubUsername
                    : '',
                bio: userProfile.bio ? userProfile.bio : '',
                twitter:
                    userProfile.social && userProfile.social.twitter
                        ? userProfile.social.twitter
                        : '',
                facebook:
                    userProfile.social && userProfile.social.facebook
                        ? userProfile.social.facebook
                        : '',
                linkedin:
                    userProfile.social && userProfile.social.linkedin
                        ? userProfile.social.linkedin
                        : '',
                youtube:
                    userProfile.social && userProfile.social.youtube
                        ? userProfile.social.youtube
                        : '',
                instagram:
                    userProfile.social && userProfile.social.instagram
                        ? userProfile.social.instagram
                        : '',
            })
        }
    }, [isLoading, userProfile])

    const handleOnChange = (e) =>
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })

    const handleOnSubmit = (e) => {
        e.preventDefault()

        if (edit) {
            dispatch(profileCreateUpdate(formData, history, true))
        } else {
            dispatch(profileCreateUpdate(formData, history))
        }
    }

    return (
        <>
            <h1 className="large text-primary">Create Your Profile</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's put some information to make your
                profile stand out
            </p>
            <small>* = required fields</small>

            <form className="form" onSubmit={handleOnSubmit}>
                <div className="form-group">
                    <select name="status" value={status} onChange={handleOnChange}>
                        <option value="0">* Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">Student or Learning</option>
                        <option value="Instructor">Instructor or Teacher</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="form-text">
                        Give us an idea of where you are at in your career
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Company"
                        name="company"
                        value={company}
                        onChange={handleOnChange}
                    />
                    <small className="form-text">
                        Could be your own company or one you work for
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Website"
                        name="website"
                        value={website}
                        onChange={handleOnChange}
                    />
                    <small className="form-text">
                        Could be your own or a company website
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={location}
                        onChange={handleOnChange}
                    />
                    <small className="form-text">
                        City & state suggested (eg. Boston, MA)
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Skills"
                        name="skills"
                        value={skills}
                        onChange={handleOnChange}
                    />
                    <small className="form-text">
                        Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Github Username"
                        name="githubUsername"
                        value={githubUsername}
                        onChange={handleOnChange}
                    />
                    <small className="form-text">
                        If you want your latest repos and a Github link to show up in your
                        profile, include your Github username
                    </small>
                </div>
                <div className="form-group">
                    <textarea
                        placeholder="A short bio of yourself"
                        name="bio"
                        value={bio}
                        onChange={handleOnChange}
                    ></textarea>
                    <small className="form-text">Tell us a little about yourself</small>
                </div>

                <div className="my-2">
                    <button
                        type="button"
                        className="btn btn-light"
                        onClick={() => setShowSocialInputs(!showSocialInputs)}
                    >
                        Add Social Network Links
                    </button>
                    <span>Optional</span>
                </div>
                {showSocialInputs && (
                    <>
                        <div className="form-group social-input">
                            <i className="fab fa-twitter fa-2x"></i>
                            <input
                                type="text"
                                placeholder="Twitter URL"
                                name="twitter"
                                value={twitter}
                                onChange={handleOnChange}
                            />
                        </div>
                        <div className="form-group social-input">
                            <i className="fab fa-facebook fa-2x"></i>
                            <input
                                type="text"
                                placeholder="Facebook URL"
                                name="facebook"
                                value={facebook}
                                onChange={handleOnChange}
                            />
                        </div>
                        <div className="form-group social-input">
                            <i className="fab fa-youtube fa-2x"></i>
                            <input
                                type="text"
                                placeholder="YouTube URL"
                                name="youtube"
                                value={youtube}
                                onChange={handleOnChange}
                            />
                        </div>
                        <div className="form-group social-input">
                            <i className="fab fa-linkedin fa-2x"></i>
                            <input
                                type="text"
                                placeholder="Linkedin URL"
                                name="linkedin"
                                value={linkedin}
                                onChange={handleOnChange}
                            />
                        </div>
                        <div className="form-group social-input">
                            <i className="fab fa-instagram fa-2x"></i>
                            <input
                                type="text"
                                placeholder="Instagram URL"
                                name="instagram"
                                value={instagram}
                                onChange={handleOnChange}
                            />
                        </div>
                    </>
                )}

                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn my-1" to="/dashboard">
                    Go Back
                </Link>
            </form>
        </>
    )
}

export default CreateProfile
