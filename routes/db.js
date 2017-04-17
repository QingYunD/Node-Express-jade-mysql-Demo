var mysql = require('mysql');
var pool = mysql.createPool({
    host: '120.26.50.11',
    user: 'test',
    password: '123456',
    database: 'test'
});

exports.query = function(sql, callback) {
    console.log(sql);
    pool.getConnection(function(err, connection) {
        connection.query(sql, function(err, rows) {
            callback(err, rows);
            //释放链接
            connection.release();
        });
    });
}

exports.statusSuccess = function(data) {
    return {
        status: 0,
        data: data
    }
}

exports.statusError = function(data) {
    return {
        status: 1,
        data: null
    }
}

exports.mysqlParamDeal = function(data) {
    var keyArr = [],
        dataArr = [];
    for (i in data) {
        keyArr.push('`' + i + '`');
        dataArr.push('\'' + data[i] + '\'');
    }
    return '(' + keyArr.join(',') + ')' + ' VALUES (' + dataArr.join(',') + ')';
}
