import React from 'react'
import { Route, Redirect } from  'react-router-dom'
import AuthToken from '../../lib/AuthToken'

const SecureRoute = ({ component: Component, ...rest }) => {
  if (AuthToken.isAuthenticated()) return <Route {...rest} component={Component}/>
  AuthToken.logout()
  return <Redirect to="/login"/>
}

export default SecureRoute 