import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import './App.css'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import { userLoad } from './store/actions/auth'
import setAuthHeader from './utils/setAuthHeader'
import Routes from './Routes'

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
            <Route component={Navbar} />

            <Switch>
                <Route exact path="/" component={Landing} />
                <Route component={Routes} />
            </Switch>
        </Router>
    )
}

export default App
