const db = require('../routes/db.js');
module.exports = {
    levelList: function(req, res, next) {
        console.log('查询');
        db.query('SELECT * FROM `level`', function(err, rows) {
            if (err) {
                console.log('查询失败' + err);
                res.status(200).send(db.statusError(err));
            } else {
                console.log(rows);
                res.status(200).send(db.statusSuccess(rows));
            }
        });
    },
    levelAdd: function(req, res, next) {
        console.log('添加level');
        console.log(JSON.parse(req.body.data));
        const data = JSON.parse(req.body.data);
        var s = {
            name: data.name,
            id: new Date().getTime()
        }
        db.query('INSERT INTO `test`.`level`' + db.mysqlParamDeal(s), function(err, rows) {
            if (err) {
                console.log('添加失败' + err);
                res.status(200).send(db.statusError(err));
            } else {
                console.log(rows);
                res.status(200).send(db.statusSuccess(null));
            }
        });
    },
    tagList: function(req, res, next) {
        console.log('查询tag列表');
        db.query('SELECT * FROM `tag`', function(err, rows) {
            if (err) {
                console.log('查询失败' + err);
                res.status(200).send(db.statusError(err));
            } else {
                console.log(rows);
                res.status(200).send(db.statusSuccess(rows));
            }
        });
    },
    tagAdd: function(req, res, next) {
        console.log('添加tag');
        const data = JSON.parse(req.body.data);
        const s = {
            name: data.name,
            subName: data.subName,
            level: data.level,
            id: new Date().getTime()
        }
        db.query('INSERT INTO `test`.`tag`' + db.mysqlParamDeal(s), function(err, rows) {
            if (err) {
                console.log('添加失败' + err);
                res.status(200).send(db.statusError(err));
            } else {
                console.log(rows);
                res.status(200).send(db.statusSuccess(rows));
            }
        });
    }
}
