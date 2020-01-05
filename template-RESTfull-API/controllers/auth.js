const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')

//register USER
function register(req, res) {
  User 
    .create(req.body)
    .then(user => res.status(201).json({
      message: `Thanks for registering ${user.username}`
    })) 
    .catch(err => res.status(422).json(err))
}

//LOGIN USER
function login(req, res) {
  User
    .findOne({ email: req.body.email })
    .then(user => {
      if (!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorised' })
      }
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' })
      res.status(202).json({ message: `Welcome back ${user.username}`, token })
    })
    .catch(() => res.status(401).json({ message: 'Unauthorised' })) 
}

function profile(req, res) {
  // console.log(req.currentUser._id)
  // console.log(req.body)
  User
    .findById(req.currentUser._id)
    .then(user => res.status(200).json(user))
    .catch(err => res.json(err))
}



module.exports = {
  register, 
  login, 
  profile
}