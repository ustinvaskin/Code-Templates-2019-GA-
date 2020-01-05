const mongoose = require('mongoose')
const { dbURI } = require('../config/environment') 
const Legend = require('../models/Legend')
const User = require('../models/User')

mongoose.connect(
  dbURI, 
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  ( err, db ) => {
    if (err) return console.log(err)
    db.dropDatabase()
      .then(() => {
        return User.create([
          {
            username: 'JJ',
            email: 'jj@email.com',
            password: 'pass',
            passwordConfirmation: 'pass'
          },
          {
            username: 'Jen',
            email: 'jen@email.com',
            password: 'pass',
            passwordConfirmation: 'pass'
          }
        ])
      })
      .then(users => {
        return Legend.create([
          {
            fullName: 'Jean Jennings Bartik', 
            gender: 'female',
            yearBorn: 1924, 
            yearofDeath: 2011, 
            image: 'https://images.findagrave.com/photos/2012/262/68065028_134808027444.jpg',
            famousProject: ['ENIAC', 'UNIVAC', 'BINAC'],
            user: users[0]
          },
          {
            fullName: 'Frances Elizabeth "Betty" Holberton née Snyder', 
            gender: 'female',
            yearBorn: 1917, 
            yearofDeath: 2001, 
            image: 'https://3.bp.blogspot.com/-AcnRyDiLPWs/WcypxnE_XHI/AAAAAAAAnKI/ikmpyYe7c94Mgv59v2p1OnI4Mqf_Y1OegCLcBGAs/s1600/Holberton.png',
            famousProject: ['ENIAC'],
            whyALegend: 'Holberton invented breakpoints in computer debugging.',
            user: users[1]
          },
          {
            fullName: 'Marlyn Wescoff Meltzer', 
            gender: 'female',
            yearBorn: 1922, 
            yearofDeath: 2008, 
            image: 'https://upload.wikimedia.org/wikipedia/en/e/e2/Marlyn_Meltzer.jpg',
            famousProject: ['ENIAC'],
            user: users[0]
          }, 
          {
            fullName: 'Kathleen "Kay" McNulty Mauchly Antonelli', 
            gender: 'female',
            yearBorn: 1921, 
            yearofDeath: 2006, 
            image: 'https://www.women.cs.cmu.edu/ada/Resources/Women/pictures/kay_antonelli.jpg',
            famousProject: ['ENIAC', 'UNIVAC', 'BINAC'],
            user: users[0]
          },
          {
            fullName: 'Frances V. Spence née Bilas', 
            gender: 'female',
            yearBorn: 1922, 
            yearofDeath: 2012, 
            image: 'https://upload.wikimedia.org/wikipedia/en/5/5f/Frances_Spence.jpg',
            famousProject: ['ENIAC'],
            user: users[1]
          },
          {
            fullName: 'Ruth Lichterman née Teitelbaum', 
            gender: 'female',
            yearBorn: 1924, 
            yearofDeath: 1986, 
            image: 'https://upload.wikimedia.org/wikipedia/en/4/4e/Ruth_Teitelbaum.jpg',
            famousProject: ['ENIAC'],
            user: users[0]
          }
        ])
      })
      .then(legends => console.log(`${legends.length} legends created`))
      .catch(err => console.log(err))
      .finally(() => mongoose.connection.close())
  } 
)


// //object to test
// {
//   "fullName": "Adele Goldstine née Katz", 
//   "gender": "female",
//   "yearBorn": 1920, 
//   "yearofDeath": 1964, 
//   "image": "https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Frances_Spence.jpg/220px-Frances_Spence.jpg",
//   "famousProject": [ "ENIAC" ],
//   "whyALegend":  "The seventh member of the ENIAC 6. she was also an instrumental player in converting the ENIAC from a computer that needed to be reprogrammed each time it was used to one that was able to perform a set of fifty stored instructions."
// }
// {
//   fullName: 'Adele Goldstine née Katz', 
//   gender: 'female',
//   yearBorn: 1920, 
//   yearofDeath: 1964, 
//   image: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Frances_Spence.jpg/220px-Frances_Spence.jpg',
//   famousProject: ['ENIAC'],
//   whyALegend:  'The seventh member of the ENIAC 6. she was also an instrumental player in converting the ENIAC from a computer that needed to be reprogrammed each time it was used to one that was able to perform a set of fifty stored instructions.'
// }



