import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { profileAddExpEdu } from '../../store/actions/profile'

const AddExperience = ({ history }) => {
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        from: '',
        current: false,
        to: '',
        description: '',
    })

    const { title, company, location, from, current, to, description } = formData

    const handleOnChange = (e) =>
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })

    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(profileAddExpEdu(formData, history))
    }

    return (
        <>
            <h1 className="large text-primary">Add An Experience</h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any developer/programming
                positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={handleOnSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Job Title"
                        name="title"
                        value={title}
                        onChange={handleOnChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Company"
                        name="company"
                        value={company}
                        onChange={handleOnChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={location}
                        onChange={handleOnChange}
                    />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input
                        type="date"
                        name="from"
                        value={from}
                        onChange={handleOnChange}
                    />
                </div>
                <div className="form-group">
                    <p>
                        <input
                            type="checkbox"
                            name="current"
                            onChange={() =>
                                setFormData({ ...formData, current: !current })
                            }
                            checked={current}
                        />{' '}
                        Current Job
                    </p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input
                        type="date"
                        name="to"
                        value={to}
                        onChange={handleOnChange}
                        disabled={current}
                    />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Job Description"
                        value={description}
                        onChange={handleOnChange}
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn my-1" to="/dashboard">
                    Go Back
                </Link>
            </form>
        </>
    )
}

export default AddExperience
