const express = require('express');
const router = express.Router();
const local = require('../local/local');

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log(req.params);
    res.render('info', { local: local, js: 'info' });
});

router.post('/addJson', local.addJson);

module.exports = router;
