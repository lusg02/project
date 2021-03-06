/* 基本图文组件对象 */
var H5ComponentBase = function (name, cfg) {
    var cfg = cfg || {};
    var id = ('h5-c-' + Math.random()).replace('.', '-');

    // 把当前的组件类型添加到样式中进行标记
    var cls = ' h5-component-' + cfg.type;
    var component = $('<div class="h5-component ' + cls + ' h5-component-name-' + name + '" id="'+ id + '">');

    cfg.text && component.text(cfg.text);
    cfg.width && component.width(cfg.width / 2);
    cfg.height && component.height(cfg.height / 2);

    cfg.css && component.css(cfg.css);
    cfg.bg && component.css('backgroundImage', 'url(' + cfg.bg + ')');

    if (cfg.center === true) {
        component.css({
            marginLeft: (cfg.width / 4 * -1) + 'px',
            left: '50%'
        });
    }

    component.on('onLoad', function () {

        setTimeout(function () {
            component.addClass(cls + '-load').removeClass(cls + '-leave');
            cfg.animateIn && component.animate(cfg.animateIn);
        }, cfg.delay || 0);

        return false;
    });
    component.on('onLeave', function () {

        setTimeout(function () {
            component.addClass(cls + '-leave').removeClass(cls + '-load');
            cfg.animateOut && component.animate(cfg.animateOut);
        }, cfg.delay || 0);

        return false;
    });

    return component;
};