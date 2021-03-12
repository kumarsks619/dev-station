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
                </Switch>
            </section>
        </Router>
    )
}

export default App
