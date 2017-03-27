/* 垂直柱图组件对象 */

var H5ComponentBar_v = function (name, cfg) {
    var component = new H5ComponentBar(name, cfg);

    var len = (100 / cfg.data.length) >> 0;
    component.find('.line').width(len + '%');

    $.each(component.find('.rate'), function () {
        var w = $(this).css('width');
        $(this).height(w).width('');
    });

    $.each(component.find('.per'), function () {
        $(this).appendTo($(this).prev());
    });

    return component;
};