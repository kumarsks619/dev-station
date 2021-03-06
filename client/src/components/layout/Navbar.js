import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { userLogout } from '../../store/actions/auth'

const Navbar = ({ history }) => {
    const dispatch = useDispatch()
    const { isAuth, isLoading } = useSelector((state) => state.auth)

    const handleLogout = () => dispatch(userLogout(history))

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <i className="fas fa-code"></i> DevStation
                </Link>
            </h1>
            <ul>
                <li>
                    <Link to="/profiles">Community</Link>
                </li>
                {!isLoading &&
                    (isAuth ? (
                        <>
                            <li>
                                <Link to="/posts">
                                    <span className="hide-sm">Timeline</span>
                                </Link>
                                <Link to="/dashboard">
                                    <i className="fas fa-user"></i>{' '}
                                    <span className="hide-sm">Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="#" onClick={handleLogout}>
                                    <i className="fas fa-sign-out-alt"></i>{' '}
                                    <span className="hide-sm">Logout</span>
                                </Link>
                            </li>
                        </>
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
