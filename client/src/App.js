import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import './App.css'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Alert from './components/layout/Alert'
import { userLoad } from './store/actions/auth'
import setAuthHeader from './utils/setAuthHeader'
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './utils/PrivateRoute'
import CreateProfile from './components/profile-form/CreateProfile'
import AddExperience from './components/profile-form/AddExperience'
import AddEducation from './components/profile-form/AddEducation'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profiles/Profile'

const App = () => {
    const dispatch = useDispatch()

    if (localStorage.getItem('token')) {
        setAuthHeader(localStorage.getItem('token'))
    }

    useEffect(() => {
        dispatch(userLoad())
    }, [dispatch])

    return (
        <Router>
            <Navbar />
            <Route exact path="/" component={Landing} />

            <section className="container">
                <Alert />
                <Switch>
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/profiles" component={Profiles} />
                    <Route exact path="/profile/:userID" component={Profile} />
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                    <PrivateRoute
                        exact
                        path="/create-profile"
                        component={CreateProfile}
                    />
                    <PrivateRoute
                        exact
                        path="/add-experience"
                        component={AddExperience}
                    />
                    <PrivateRoute exact path="/add-education" component={AddEducation} />
                </Switch>
            </section>
        </Router>
    )
}

export default App
