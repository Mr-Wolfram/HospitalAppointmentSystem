"use strict";

const express = require('express'),
    Mapping = require('../models/mapping'),
    router = express.Router();

/* GET users listing. */
router.get('/insert', async (req, res, next) => {
    let key = req.query.key;
    let val = req.query.val;
    await Mapping.findOneAndUpdate({ key: key }, { $set: { val: val } }, { upsert: true });
    res.send(`inserted: key = ${req.query.key}, val = ${req.query.val}`);
});

router.get('/get', async (req, res, next) => {
    let key = req.query.key;
    let r = await Mapping.findOne({ key: key });
    let s = r === null ? `key '${key}' not found` : `${key}: ${r.val}`;
    res.send(s);
});

router.get('/getall', async (req, res, next) => {
    let a = await Mapping.find({}); // find all
    let s = a.map(d => `${d.key}: ${d.val}`).join('<br>')
    res.send(s);
})

module.exports = router;
