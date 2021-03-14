import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { profileAddExpEdu } from '../../store/actions/profile'

const AddEducation = ({ history }) => {
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldOfStudy: '',
        from: '',
        current: false,
        to: '',
        description: '',
    })

    const { school, degree, fieldOfStudy, from, current, to, description } = formData

    const handleOnChange = (e) =>
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })

    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(profileAddExpEdu(formData, history, true))
    }

    return (
        <>
            <h1 className="large text-primary">Add Your Education</h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any school, bootcamp, etc that
                you have attended
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={handleOnSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* School or Bootcamp"
                        name="school"
                        value={school}
                        onChange={handleOnChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Degree or Certificate"
                        name="degree"
                        value={degree}
                        onChange={handleOnChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Field Of Study"
                        name="fieldOfStudy"
                        value={fieldOfStudy}
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
                        Current School or Bootcamp
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
                        placeholder="Program Description"
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

export default AddEducation
