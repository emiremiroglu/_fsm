
const parser = require('body-parser');
const express = require('express');
const morgan = require('morgan');

// ROUTES
const auth = require('./routes/auth.js');
const conversion_trackers = require('./routes/conversion_trackers.js');
const dco = require('./routes/dco.js');

const fsm = express()

const checkAuth = (req, res, next) => {
  if(!req.headers.auth) {
    res.sendStatus(401)
  } else {
    next()
  }
}

fsm.use(parser.json());
fsm.use(morgan(':method :url :status :res[content-length] :response-time ms'));

fsm.use('/auth', auth)
fsm.use('/conversion_trackers/', checkAuth, conversion_trackers)
fsm.use('/dco/', dco)

fsm.listen(3030)