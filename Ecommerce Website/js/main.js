//如何在一个网站去书写JS
//1、JS的分层（功能）:  jquery(tools)   组件(ui)     应用（app）
//2、JS的规划（管理）:  避免全局变量和方法（命名空间、闭包、面向对象）    模块化(seaJs requireJs)

window.onload = function () {
    mv.app.toTip();
    mv.app.toBanner();
}

var mv = {};

mv.tools = {};

mv.tools.getByClass = function (oParent, className) {
    var aEle = oParent.getElementsByTagName('*');
    var arr = [];

    for (var i = 0; i < aEle.length; i += 1) {
        if (aEle[i].className === className) {
            arr.push(aEle[i]);
        }
    }
    return arr;
}

mv.ui = {};

mv.ui.textChange = function (obj, str) {

    obj.onfocus = function () {
        if (this.value === str) {
            this.value = '';
        }
    };

    obj.onblur = function () {
        if (this.value === '') {
            this.value = str;
        }
    };
}

mv.ui.fadeIn = function (obj) {
    var value = 0;
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var iSpeed = 5;
        if (value === 100) {
            clearInterval(obj.timer);
        } else {
            value += iSpeed;
            obj.style.opacity = value/100;
            obj.style.filter = 'alpah(opacity:' + value + ')';
        }
    }, 30);
};
mv.ui.fadeOut = function (obj) {
    var value = 100;
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var iSpeed = -5;
        if (value === 0) {
            clearInterval(obj.timer);
        } else {
            value += iSpeed;
            obj.style.opacity = value/100;
            obj.style.filter = 'alpah(opacity:' + value + ')';
        }
    }, 30);
};

mv.app = {};

mv.app.toTip = function () {
    var oText1 = document.getElementById('text1');
    var oText2 = document.getElementById('text2');

    mv.ui.textChange(oText1, 'Search website');
    mv.ui.textChange(oText2, 'Search website');
};

mv.app.toBanner = function () {
    var oAd = document.getElementById('ad');
    var aLi = oAd.getElementsByTagName('li');
    var prevBg = mv.tools.getByClass(oAd, 'prev-bg')[0];
    var nextBg = mv.tools.getByClass(oAd, 'next-bg')[0];
    var oPrev = mv.tools.getByClass(oAd, 'prev')[0];
    var oNext = mv.tools.getByClass(oAd, 'next')[0];
    var iNow = 0;

    var timer = setInterval(auto, 3000);

    function auto() {
        if (iNow === aLi.length-1) {
            iNow = 0;
        } else {
            iNow += 1;
        }
        for (var i = 0; i < aLi.length; i += 1) {
            mv.ui.fadeOut(aLi[i]);
        }
        mv.ui.fadeIn(aLi[iNow]);
    }
    function autoPrev(){

        if(iNow === 0){
            iNow = aLi.length-1;
        }
        else{
            iNow--;
        }

        for(var i = 0; i < aLi.length; i += 1){
            mv.ui.fadeOut(aLi[i]);
        }

        mv.ui.fadeIn(aLi[iNow]);

    }
    prevBg.onmouseover = oPrev.onmouseover = function () {
        oPrev.style.display = 'block';
        clearInterval(timer);
    }
    nextBg.onmouseover = oNext.onmouseover = function () {
        oNext.style.display = 'block';
        clearInterval(timer);
    }
    prevBg.onmouseout = oPrev.onmouseout = function () {
        oPrev.style.display = 'none';
        timer = setInterval(auto,3000);
    }
    nextBg.onmouseout = oNext.onmouseout = function () {
        oNext.style.display =  'none';
        timer = setInterval(auto,3000);
    }
    oPrev.onclick = function () {
        autoPrev();
    }
    oNext.onclick = function () {
        auto();
    }
}