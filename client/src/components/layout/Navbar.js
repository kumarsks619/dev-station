import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { userLogout } from '../../store/actions/auth'

const Navbar = () => {
    const dispatch = useDispatch()
    const { isAuth, isLoading } = useSelector((state) => state.auth)

    const handleLogout = () => dispatch(userLogout())

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <i className="fas fa-code"></i> DevStation
                </Link>
            </h1>
            <ul>
                <li>
                    <Link to="/profiles">Developers</Link>
                </li>
                {!isLoading &&
                    (isAuth ? (
                        <li>
                            <Link to="#" onClick={handleLogout}>
                                <i className="fas fa-sign-out-alt"></i>{' '}
                                <span className="hide-sm">Logout</span>
                            </Link>
                        </li>
                    ) : (
                        <>
                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                        </>
                    ))}
            </ul>
        </nav>
    )
}

export default Navbar
