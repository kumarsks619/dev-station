import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { alertSet } from '../../store/actions/alert'

const Register = () => {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
    })

    const { name, email, password, passwordConfirm } = formData

    const handleOnChange = (e) =>
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })

    const handleOnSubmit = (e) => {
        e.preventDefault()

        if (password !== passwordConfirm) {
            dispatch(alertSet('Passwords do not match', 'danger'))
        } else {
            console.log(formData)
        }
    }

    return (
        <>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Create Your Account
            </p>
            <form className="form" onSubmit={handleOnSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={handleOnChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={handleOnChange}
                        required
                    />
                    <small className="form-text">
                        This website uses Gravatar, so if you want a profile image, use a
                        Gravatar email.
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        minLength="6"
                        name="password"
                        value={password}
                        onChange={handleOnChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        minLength="6"
                        name="passwordConfirm"
                        value={passwordConfirm}
                        onChange={handleOnChange}
                    />
                </div>

                <input type="submit" value="Register" className="btn btn-primary" />
            </form>

            <p className="my-1">
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </>
    )
}

export default Register
