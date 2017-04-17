const fs = require('fs');

module.exports = {
    addJson: function(req, res) {
        // console.log(req.params.name);
        console.log(req.body.data);
        const datas = JSON.parse(req.body.data);
        console.log(datas.name);
        const jsonUrl = './public/json/' + datas.name + '.json';
        // 判断文件是否存在
        fs.exists(jsonUrl, function(data) {
            console.log('data:' + data);
            if (!data) {
                // 不存在
                // 创建一个可以写入的流 写入到文件中
                const writestream = fs.createWriteStream(jsonUrl);
                // 使用utf8编码写入数据
                writestream.write(JSON.stringify({}), "utf8");
                // 标记文件末尾
                writestream.end();
                // 处理流事件
                writestream.on('finish', function() {
                    console.log('写入完成');
                    res.json({ status: 'ok' });
                });
                writestream.on('error', function(err) {
                    console.log('error : ' + err.stack);
                });
            } else {
                console.log(jsonUrl);
                const fsData = fs.readFileSync(jsonUrl).toString();
                var jsonData = fsData ? JSON.parse(fsData) : {};
                jsonData[datas.list.id] = datas.list;
                console.log(JSON.stringify(jsonData));
                fs.writeFileSync(jsonUrl, JSON.stringify(jsonData), {}, "utf8");
            }
        });
    }
}
