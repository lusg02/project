;var $ = function (id) {
    return document.getElementById(id);
};

var addEvent = function (obj, event, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(event, fn, false);
    } else if (obj.attachEvent){
        obj.attachEvent('on' + event, fn);
    }
};

var domSider = $('J_BdSide');

var scrollEvent = function () {

    var sideHeight = domSider.offsetHeight;
    var screenHeight = document.documentElement.clientHeight || document.body.clientHeight;
    var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;

    if (scrollHeight + screenHeight > sideHeight) {
        domSider.style.cssText = 'position: fixed; right: 0; top:' + (-(sideHeight - screenHeight)) + 'px';
    } else {
        domSider.style.position = 'static';
    }

};

addEvent(window, 'scroll', function () {
    scrollEvent();
});

addEvent(window, 'resize', function () {
    scrollEvent();
});


