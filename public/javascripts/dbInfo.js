$(function() {
    console.log('now dbInfo.js');

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

    // 查询level标签
    viewModel.getLevelList = function() {
        // 数据库查询
        $.ajax({
            type: 'get',
            url: '/db/level/list',
            success: function(data) {
                console.log('db data');
                viewModel.levelList([]);
                var listJson = {};
                $.each(data.data, function(i, val) {
                    viewModel.levelList.push(val);
                    listJson[val.id] = val;
                });
                viewModel.levelListJson = listJson;
                console.log(viewModel.levelListJson);
            },
            error: function(err) {
                console.log(err);
            }
        });
    }

    // 新增level标签
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
        $.ajax({
            type: 'post',
            url: '/db/level/add',
            data: {
                data: JSON.stringify({
                    name: viewModel.levelAdd(),
                })
            },
            success: function(data) {
                console.log(data);
                viewModel.levelAdd('');
                viewModel.getLevelList();
            },
            error: function(err) {
                console.log(err);
            }
        });
    }

    // 查询tag
    viewModel.getTagList = function() {
        $.ajax({
            type: 'get',
            url: '/db/tag/list',
            success: function(data) {
                viewModel.tagList([]);
                $.each(data.data, function(i, val) {
                    val.level = val.level ? val.level.split(',') : [];
                    viewModel.tagList.push(val);
                });
            },
            error: function(err) {
                console.log(err);
            }
        });
    }

    // 添加tag标签
    viewModel.addTag = function() {
        let newTag = JSON.parse(ko.toJSON(viewModel.newTag));
        if (!newTag.name) return;
        newTag.level = newTag.level.join(',');
        $.ajax({
            type: "post",
            url: "/db/tag/add",
            data: {
                data: JSON.stringify(newTag)
            },
            success: function(data) {
                console.log('成功添加tag标签');
                viewModel.getTagList();
                ko.viewmodel.updateFromModel(viewModel.newTag, {
                    name: '',
                    subName: '',
                    level: []
                });
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


    viewModel.getLevelList();
    viewModel.getTagList();
});
