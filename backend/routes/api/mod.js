"use strict";

const express = require("express"),
    router = express.Router(),
    doctorRouter = require('./doctor'),
    announceRouter = require('./announce'), //,
    adminisRouter = require('./admin'),
    registerRouter = require('./register');

router.use('/doctor', doctorRouter);
router.use('/announce', announceRouter);
router.use('/admin', adminisRouter);
router.use('/register', registerRouter);

module.exports = router;