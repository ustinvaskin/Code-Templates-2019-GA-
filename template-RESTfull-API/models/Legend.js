const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true } // the user who is making the comment, this is a referenced relationship
}, {
  timestamps: true
})

const legendSchema = new mongoose.Schema({
  fullName: { type: String, required: true }, 
  gender: { type: String, required: true },
  yearBorn: { type: Number, required: true }, 
  yearofDeath: { type: Number, required: true, max: 2018 }, //max year of death 2018. 
  image: { type: String, required: true },
  famousProject: { type: [String], required: true },
  whyALegend: { type: String },
  comments: [ commentSchema ],
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

legendSchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('Legend', legendSchema)