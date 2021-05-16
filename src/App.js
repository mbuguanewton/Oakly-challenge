import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Admin from './pages/Admin'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

const App = () => (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/admin' component={Admin} />
        <Route exact path='*' component={NotFound} />
    </Switch>
)

export default App
