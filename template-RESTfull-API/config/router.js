const router = require('express').Router()
const legends = require('../controllers/legends')
const users = require('../controllers/auth')
const secureRoute = require('../lib/secureRoute')

router.route('/legends')
  .get(legends.index)
  .post(secureRoute, legends.create) //secure route

router.route('/legends/:id')
  .get(legends.show)
  .delete(secureRoute, legends.remove) //secure route
  .put(secureRoute, legends.update) //secure route

router.route('/legends/:id/comments')
  .post(secureRoute, legends.commentCreate) // secure route
  .get(legends.commentsShow)

router.route('/legends/:id/comments/:commentId')
  .delete(secureRoute, legends.commentDelete) // secure route
  .get(legends.commentShow)
  .put(secureRoute, legends.commentUpdate) // secure route

router.route('/register')
  .post(users.register)

router.route('/login')
  .post(users.login)

router.route('/profile')
  .get(secureRoute, users.profile)

module.exports = router 