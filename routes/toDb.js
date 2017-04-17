const express = require('express');
const router = express.Router();
const db = require('../db/dealDb');

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log(req.params);
    res.render('info', { local: {}, js: 'dbInfo' });
});

router.get('/level/list', db.levelList);
router.post('/level/add', db.levelAdd);
router.get('/tag/list', db.tagList);
router.post('/tag/add', db.tagAdd);

module.exports = router;
