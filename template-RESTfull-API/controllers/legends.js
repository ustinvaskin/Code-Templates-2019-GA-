const Legend = require('../models/Legend')

//index route - GET - /legends
function index(req, res) {
  Legend
    .find()
    .populate('user')
    //.populate('comments.user')
    .then(legends => res.status(200).json(legends))
    .catch(() => res.status(404).json({ message: 'Not Found' }))
}

//create new route - POST - /legends
function create(req, res, next) {
  console.log(req.currentUser)
  console.log(req.body)
  req.body.user = req.currentUser //attaching a user key to the body, making it values currentUser from secureRoute
  Legend
    .create(req.body)
    .then(legend => res.status(201).json(legend))
    .catch(next)
}

//show legend - GET - /legends/:id
function show(req, res) {
  Legend
    .findById(req.params.id)
    .populate('user')
    .populate('comments.user')
    .then(legend => {
      if (!legend) return res.status(404).json({ message: 'Not Found' })
      res.status(200).json(legend)
    })
    .catch(() => res.status(404).json({ message: 'Not Found ' }))
}

//Update legend - PUT - /legends/:id
function update(req, res, next) {
  Legend
    .findById(req.params.id)
    .then(legend => {
      if (!legend) return res.sendStatus(404).json({ message: 'Not Found' })
      legend.set(req.body) // update the properties with the data from the request // set. merges two objects together
      return legend.save()
    })
    .then(legend => legend.save()) //save is inbuilt)
    .then(legend => res.status(202).json(legend))
    .catch(next)
}

//Delete - /legends/:id
function remove(req, res) {
  Legend
    //.findByIdAndRemove(req.params.id) // find and delete in one go
    .findById(req.params.id)
    .then((legend) => {
      if (!legend.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Not Authorised' })
      return legend.remove()
    })
    .then(legend => res.status(204).json(legend))
    .catch(err => res.status(400).json(err))
}

//comment create - POST -  /legends/:id/comments
function commentCreate(req, res, next) {
  req.body.user = req.currentUser
  Legend
    .findById(req.params.id)
    .then( legend => {
      if (!legend) return res.status(404).json({ message: 'not found' })
      legend.comments.push(req.body)
      return legend.save()  
    })
    .then(legend => res.status(201).json(legend))
    .catch(next)
}

//comment delete - legends/:id/comments/:commentId
function commentDelete(req, res) {
  console.log(req.body.user)
  console.log(req.currentUser)
  req.body.user = req.currentUser
  Legend
    .findById(req.params.id)
    .then(legend => {
      if (!legend) return res.status(404).json({ message: 'Not found' })
      const comment = legend.comments.id(req.params.commentId)
      comment.remove()
      return legend.save()
    })
    .then(legend => res.status(202).json(legend))
    .catch(err => res.status(400).json(err))
}

//comment Show - GET - legends/:id/comments/:commentId
function commentShow(req, res) {
  Legend
    .findById(req.params.id)
    .populate('comments.user')
    .then(legend => {
      if (!legend) return res.status(404).json({ message: 'Not found' })
      const comment = legend.comments.id(req.params.commentId)
      res.status(200).json(comment)
    })
    .catch(() => res.status(404).json({ message: 'Not Found ' }))
}

//Edits one comment - legends/:id/comments/:commentId
function commentUpdate(req, res, next) {
  Legend
    .findById(req.params.id)
    .then(legend => {
      // find the legend using it's id, if you can't find it then throw 404
      if (!legend) return res.status(404).json({ message: 'Not Found' })
      // find the comment using the comment id
      const comment = legend.comments.id(req.params.commentId)
      // check that I'm the owner of the comment 
      if (!comment.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Not Authorised' })
      
      comment.set(req.body) // the .set method comes from mongoose, it merges the old object with our new information for the update
      legend.save()
      return comment.save()
    })
    .then(legend => res.status(202).json(legend)) // once that legend has been saved, we send it back to the client to show that is updated.
    .catch(next) // if anything goes wrong we send back the error response
}


//Shows all comments associated with the legend - legend/:id/comments
function commentsShow(req, res) {
  Legend
    .findById(req.params.id)
    .populate('comments.user')
    .then(legend => {
      if (!legend) return res.status(404).json({ message: 'Not found' })
      res.status(200).json(legend.comments)
    })
    .catch(() => res.status(404).json({ message: 'Not Found ' }))
}


module.exports = {
  index, 
  create, 
  show, 
  update, 
  remove, 
  commentCreate, 
  commentDelete, 
  commentShow, 
  commentUpdate, 
  commentsShow
}


// ALL COMMENT EDITS 
// //Edits one comment - legends/:id/comments/:commentId
// function commentUpdate(req, res, next) {
//   Animal
//     .findById(req.params.id)
//     .then(animal => {
//       // find the legend using it's id, if you can't find it then throw 404
//       if (!animal) return res.status(404).json({ message: 'Not Found' })
//       // find the comment using the comment id
//       const comment = animal.comments.id(req.params.commentId)
//       // check that I'm the owner of the comment 
//       if (!comment.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Not Authorised' })
      
//       comment.set(req.body) // the .set method comes from mongoose, it merges the old object with our new information for the update
//       animal.save()
//       return comment.save()
//     })
//     .then(animal => res.status(202).json(animal)) // once that legend has been saved, we send it back to the client to show that is updated.
//     .catch(next) // if anything goes wrong we send back the error response
// }

// // //Edits one comment - animals/:id/comments/:commentId
// // function commentUpdate(req, res) {
// //   req.body.user = req.currentUser
// //   Animal
// //     .findById(req.params.id)
// //     .populate('comments.user')
// //     .then(animal => {
// //       if (!animal) return res.status(404).json({ message: 'Not found' })
// //       const comment = animal.comments.id(req.params.commentId)
// //       comment.set(req.body) // the .set method comes from mongoose, it merges the old object with our new information for the update
// //       return comment.save()
// //     })
// //     .then(animal => animal.save()) // once we've set the animal with the new informtion, we save it, .save() is an inbuilt method just like set. Importantly it re runs our models validations, which the method findByIdAndUpdate does not 
// //     .then(animal => res.status(202).json(animal)) // once that animal has been saved, we send it back to the client to show that is updated.
// //     .catch(err => res.status(422).json(err)) // if anything goes wrong we send back the error response
// // }


// // //Edits one comment - animal/:id/comments/:commentId
// // function commentUpdate(req, res, next) {
// //   Animal
// //     .findById(req.params.id)
// //     .then(animal => {
// //       if (!animal) return res.status(404).json({ message: 'Not Found' })
// //       if (!animal.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Not Authorised' })
// //       return animal.set(req.body)
// //     })
// //     .then(animal => {
// //       const comment = animal.comments.id(req.params.commentId)
// //       comment.set(req.body) // the .set method comes from mongoose, it merges the old object with our new information for the update
// //       animal.save()
// //       return comment.save() 
// //     })
// //     .then(animal => res.status(202).json(animal)) // once that animal has been saved, we send it back to the client to show that is updated.
// //     .catch(next) // if anything goes wrong we send back the error response
// // }