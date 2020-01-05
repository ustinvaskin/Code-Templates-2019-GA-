import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import 'bulma' 

import LegendsIndex from './components/legends/LegendsIndex'
import Home from './components/common/Home'
import LegendShow from './components/legends/LegendShow'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import LegendAdd from './components/legends/LegendAdd'
import SecureRoute from './components/common/SecureRoute'
import LegendEdit from './components/legends/LegendEdit'
import AuthToken from './lib/AuthToken'
import './style.scss'


const App = () => (
  <BrowserRouter>
    <nav className="navbar is-warning">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/legends">Discover the legends of tech</Link>
          <Link className="navbar-item" to="/legends/new">Add new</Link>
          <Link className="navbar-item" to="/register">Register</Link>
          <Link className="navbar-item" to="/login">Login</Link>
        </div>
      </div>
    </nav>
    <main>
      <Switch>
        <Route exact path = "/" component={Home} />
        <SecureRoute path = "/legends/new" component={LegendAdd} />
        <SecureRoute path = "/legends/:id/edit" component={LegendEdit}/>
        <Route path = "/legends/:id" component={LegendShow} />
        <Route path = "/legends" component={LegendsIndex} />
        <Route path = "/register" component={Register} />
        <Route path = "/login" component={Login} />
      </Switch>
    </main>
  </BrowserRouter>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)