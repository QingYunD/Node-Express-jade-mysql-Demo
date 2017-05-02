/*
 *hichat v0.4.2
 *Wayou Mar 28,2014
 *MIT license
 *view on GitHub:https://github.com/wayou/HiChat
 *see it in action:http://hichat.herokuapp.com/
 */
window.onload = function() {
    var hichat = new HiChat();
    hichat.init();
};
var HiChat = function() {
    this.socket = null;
};
HiChat.prototype = {
    init: function() {
        var that = this;
        console.log('init');
        this.socket = io.connect();
        this.socket.on('connect', function() {
            console.log('connect');
            that.socket.emit('login');

        });
        this.socket.on('refreshs', function() {
            console.log('refreshs');
            window.location.reload();
        });

    }
};
