// 1. 数据定义
var data = [{
    img: 1,
    h1: 'Creative',
    h2: 'DUET'
}, {
    img: 2,
    h1: 'Friendly',
    h2: 'DEVIL'
}, {
    img: 3,
    h1: 'Tranquilent',
    h2: 'COMPATRIOT'
}, {
    img: 4,
    h1: 'Insecure',
    h2: 'HUSSLER'
}, {
    img: 5,
    h1: 'Loving',
    h2: 'REBEL'
}, {
    img: 6,
    h1: 'Passionate',
    h2: 'SEEKER'
}, {
    img: 7,
    h1: 'Crazy',
    h2: 'FRIEND'
}, ];

// 2. 通用函数
var g = function(id) {
    if (id.substr(0, 1) === '.') {
        return document.getElementsByClassName(id.substr(1));
    }
    return document.getElementById(id);
};

// 3. 添加幻灯片的操作(所有幻灯片&对应的按钮)
function addSliders() {
    // 3.1 获取模板
    var tpl_main = g('template-main').innerHTML.replace(/^\s*/, '').replace(/\s*$/, '');
    var tpl_ctrl = g('template-ctrl').innerHTML.replace(/^\s*/, '').replace(/\s*$/, '');

    // 3.2 定义最终输出 HTML 的变量
    var out_main = [];
    var out_ctrl = [];

    // 3.3 遍历所有数据，构建最终输出 HTML
    for (var i in data) {
        var _html_main = tpl_main
            .replace(/{{index}}/g, data[i].img)
            .replace(/{{h2}}/g, data[i].h1)
            .replace(/{{h3}}/g, data[i].h2)
            .replace(/{{css}}/g, ['', 'main-i-right'][i % 2]);
        var _html_ctrl = tpl_ctrl
            .replace(/{{index}}/g, data[i].img);

        out_main.push(_html_main);
        out_ctrl.push(_html_ctrl);
    }

    // 3.4 把HTML回写到对应的DOM里
    g('template-main').innerHTML = out_main.join('');
    g('template-ctrl').innerHTML = out_ctrl.join('');

    // 7. 增加#main_background
    g('template-main').innerHTML += tpl_main
        .replace(/{{index}}/g, '{{index}}')
        .replace(/{{h2}}/g, data[i].h1)
        .replace(/{{h3}}/g, data[i].h2);

    g('main-{{index}}').id = 'main-background';
}

// 5. 幻灯片切换
function switchSlider(n) {
    // 5.1 获得要展现的幻灯片&控制按钮 DOM
    var main = g('main-' + n);
    var ctrl = g('ctrl-' + n);

    // 5.2 清除他们的active样式
    var clear_main = g('.main-i');
    var clear_ctrl = g('.ctrl-i');
    for (var i = 0; i < clear_ctrl.length; i++) {
        clear_main[i].className = clear_main[i].className.replace('main-i-active', '');
        clear_ctrl[i].className = clear_ctrl[i].className.replace('ctrl-i-active', '');
    }

    // 5.3 为当前附加样式
    main.className += ' main-i-active';
    ctrl.className += ' ctrl-i-active';

    // 7.2 切换时，复制上一张幻灯片到 main-background中
    setTimeout(function() {
        g('main-background').innerHTML = main.innerHTML;
    }, 1000);
}

// 6. 动态调整图片的margin-top,以使其垂直居中
function movePictures() {
    var pictures = g('.picture');
    for (var i = 0; i < pictures.length; i++) {
        pictures[i].style.marginTop = (-1 * pictures[i].clientHeight / 2) + 'px';
    }
}

// 4. 定义何时处理幻灯片输出
window.onload = function() {
    addSliders();
    switchSlider(2);
    setTimeout(function() {
        movePictures();
    }, 100);
}