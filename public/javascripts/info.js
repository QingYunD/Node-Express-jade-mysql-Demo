$(function() {
    console.log('now info.js');

    var viewModel = ko.viewmodel.fromModel({
        tagList: [],
        levelList: [],
        levelListJson: {},
        levelAdd: '',
        newTag: {
            name: '',
            subName: '',
            level: []
        }
    });

    ko.applyBindings(viewModel, document.getElementById('info'));

    /**
     * [getJsonData 获取json文件数据 当不存在时，新建json文件]
     * @param  {[type]} _name [json列表名称]
     * @return {[type]}       [description]
     */
    viewModel.getJsonData = function(_name, _fun) {
        $.getJSON('./json/' + _name + '.json').then(function(json) {
            console.log(json);
            viewModel[_fun](json);
        }, function(s) {
            console.log(s);
            console.log(_name);
            if (s.status == 404) {
                // 当tag列表json文件不存在时，新建tagList.json文件
                $.ajax({
                    url: '/local/addJson',
                    type: 'post',
                    data: {
                        data: JSON.stringify({
                            name: _name
                        })
                    },
                    success: function(s) {
                        if (s.status == 'ok') {
                            console.log('写入' + _name + '.json文件成功');
                        }
                    },
                    error: function(err) {
                        var msg = 'Status: ' + err.status + ': ' + err.responseText;
                        console.log(msg);
                    }
                });
            }
        });
    }

    /**type: 'post',
     * [getJsonList 获取列表]
     * @param  {[type]} _data [tag列表json文件数据]
     * @return {[type]}       [description]
     */
    viewModel.getTagList = function(_data) {
        viewModel.tagList([]);
        $.each(_data, function(i, val) {
            val.level = val.level ? val.level.split(',') : [];
            viewModel.tagList.push(val);
        });
        console.log(viewModel.tagList());
    }

    viewModel.getLevelList = function(_data) {
        viewModel.levelList([]);
        $.each(_data, function(i, val) {
            viewModel.levelList.push(val);
        });
        console.log(viewModel.levelList());
        viewModel.levelListJson = _data;
        console.log(viewModel.levelListJson);
    }

    // 添加tag标签
    viewModel.addTag = function() {
        let newTag = JSON.parse(ko.toJSON(viewModel.newTag));
        if (!newTag.name) return;
        newTag.id = new Date().getTime();
        viewModel.tagList.push(newTag);
        newTag.level = newTag.level.join(',');
        ko.viewmodel.updateFromModel(viewModel.newTag, {
            name: '',
            subName: '',
            level: []
        });
        $.ajax({
            type: "post",
            url: "/local/addJson",
            data: {
                data: JSON.stringify({
                    name: 'tagList',
                    list: newTag
                })
            },
            success: function(data) {
                console.log('成功添加tag标签');
            },
            error: function(err) {
                var msg = 'Status: ' + err.status + ': ' + err.responseText;
                console.log(msg);
            }
        })
    }

    // 给新tag添加level
    viewModel.newTagAddLevel = function(_vm) {
        let levelArr = viewModel.newTag.level();
        if (viewModel.newTag.level().indexOf(_vm.id) == -1) {
            levelArr.push(_vm.id);
        } else {
            levelArr.splice(viewModel.newTag.level().indexOf(_vm.id), 1);
        }
        viewModel.newTag.level(levelArr);
    }

    // 添加新level
    viewModel.addLevel = function() {
        if (!viewModel.levelAdd()) return;
        let isLevel = true;
        $.each(viewModel.levelList(), function(i, val) {
            if (val.name == viewModel.levelAdd()) {
                console.log('已有相同level标签');
                isLevel = false;
            }
        });
        if (!isLevel) return;
        let newLevel = {
            name: viewModel.levelAdd(),
            id: new Date().getTime()
        };
        viewModel.levelAdd('');
        viewModel.levelList.push(newLevel);
        $.ajax({
            type: "post",
            url: "/local/addJson",
            data: {
                data: JSON.stringify({
                    name: 'levelList',
                    list: newLevel
                })
            },
            success: function(data) {
                console.log('成功添加level标签');
            },
            error: function(err) {
                var msg = 'Status: ' + err.status + ': ' + err.responseText;
                console.log(msg);
            }
        });
    }

    // level 删除
    viewModel.deleLevel = function() {

    }

    viewModel.getJsonData('levelList', 'getLevelList');
    viewModel.getJsonData('tagList', 'getTagList');

});
