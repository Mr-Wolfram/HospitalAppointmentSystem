"use strict";

const   
  express = require('express'),
  router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
    console.log(req.query)
    res.send('hh')
});

module.exports = router;
