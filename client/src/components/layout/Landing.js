import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Landing = () => {
    const { isAuth } = useSelector((state) => state.auth)

    if (isAuth) {
        return <Redirect to="/posts" />
    }

    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">Developers Station</h1>
                    <p className="lead">
                        Create developer profile/portfolio, share posts and get help from
                        other developers
                    </p>
                    <div className="buttons">
                        <Link to="/register" className="btn btn-primary">
                            Sign Up
                        </Link>
                        <Link to="/login" className="btn">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Landing
