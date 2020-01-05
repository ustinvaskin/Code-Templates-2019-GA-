const User = require('../models/User')
const { secret } = require('../config/environment')
const jwt = require('jsonwebtoken')

function secureRoute(req, res, next) {
  console.log(req.headers.authorization)
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Unauthorised' })
  }

  const token = req.headers.authorization.replace('Bearer ', '')

  jwt.verify(token, secret, (err, payload) => {
    if (err) return res.status(401).json({ message: 'Unauthorised' })
    User
      .findById(payload.sub)
      .then( user => {
        if (!user) return res.status(401).json({ message: 'Unauthorised' })
        req.currentUser = user // <---this allows secure route to know the currentUser
        next()
      })
      .catch(() => res.status(401).json({ message: 'Unauthorised' }))
  })
}

module.exports = secureRoute
