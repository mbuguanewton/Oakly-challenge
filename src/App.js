import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Admin from './pages/Admin'
import Home from './pages/Home'

const App = () => (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/admin' component={Admin} />
    </Switch>
)

export default App
