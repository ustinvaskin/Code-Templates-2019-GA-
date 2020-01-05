function logger(req, res, next) { //custom middleware to log incomming requests. once logged it goes on (next is called) 
  console.log(`incoming ${req.method} to ${req.url}`)
  next() //if there is no next here the programme will never leave this function
}

module.exports = logger