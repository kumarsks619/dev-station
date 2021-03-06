import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { userLogin } from '../../store/actions/auth'

const Login = () => {
    const dispatch = useDispatch()
    const { isAuth } = useSelector((state) => state.auth)

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData

    const handleOnChange = (e) =>
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })

    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(userLogin({ email, password }))
    }

    // to redirect on successful login
    if (isAuth) {
        return <Redirect to="/posts" />
    }

    return (
        <>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Login To Your Account
            </p>
            <form className="form" onSubmit={handleOnSubmit}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={handleOnChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={handleOnChange}
                    />
                </div>

                <input type="submit" value="Login" className="btn btn-primary" />
            </form>

            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </>
    )
}

export default Login
