var ew= {
    tools: {
        getByClass: function (oParent, className) {
            var aEle = oParent.getElementsByTagName('*');
            var arr = [];

            for (var i = 0; i < aEle.length; i += 1) {
                if (aEle[i].className === className) {
                    arr.push(aEle[i]);
                }
            }
            return arr;
        },
        getStyle: function (obj, attr) {
            if (obj.currentStyle) {
                return obj.currentStyle[attr];
            } else {
                return getComputedStyle(obj)[attr];
            }
        },
        addEvent: function (obj, type, handler) {
            if (obj.addEventListener) {
                obj.addEventListener(type, handler, false);
            } else if (obj.attachEvent) {
                obj.attachEvent('on' + type, handler);
            }
        }
    },
    ui: {
        textChange: function (obj, str) {
            ew.tools.addEvent(obj, 'focus', function () {
                if (this.value === str) {
                    this.value = '';
                }
            });
            ew.tools.addEvent(obj, 'blur', function () {
                if (this.value === '') {
                    this.value = str;
                }
            });
        },
        fadeIn: function (obj) {
            var currentOpacity = ew.tools.getStyle(obj, 'opacity');
            if (currentOpacity === 1) {
                return false;
            }

            var value = 0;
            clearInterval(obj.timer);

            obj.timer = setInterval(function () {
                var iSpeed = 5;
                if (value === 100) {
                    clearInterval(obj.timer);
                } else {
                    value += iSpeed;
                    obj.style.opacity = value / 100;
                    obj.style.filter = 'alpha(opacity:' + value + ')';
                }
            }, 30);
        },
        fadeOut: function (obj) {
            var currentOpacity = ew.tools.getStyle(obj, 'opacity');

            if (currentOpacity === 0) {
                return false;
            }

            var value = 100;
            clearInterval(obj.timer);

            obj.timer = setInterval(function () {
                var iSpeed = -5;
                if (value === 0) {
                    clearInterval(obj.timer);
                } else {
                    value += iSpeed;
                    obj.style.opacity = value / 100;
                    obj.style.filter = 'alpha(opacity:' + value + ')';
                }
            }, 30);
        },
        moveLeft: function (obj, old, now) {
            clearInterval(obj.timer);
            obj.timer = setInterval(function () {
                var iSpeed = (now - old) / 10;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                if (now === old) {
                    clearInterval(obj.timer);
                } else {
                    old += iSpeed;
                    obj.style.left = old + 'px';
                }

            }, 30);
        }
    },
    app: {
        toTip: function () {
            var oText1 = document.getElementById('text1');
            var oText2 = document.getElementById('text2');

            ew.ui.textChange(oText1, 'Search website');
            ew.ui.textChange(oText2, 'Search website');
        },
        toBanner: function () {
            var oAd = document.getElementById('ad');
            var aLi = oAd.getElementsByTagName('li');
            var prevBg = ew.tools.getByClass(oAd, 'prev-bg')[0];
            var nextBg = ew.tools.getByClass(oAd, 'next-bg')[0];
            var oPrev = ew.tools.getByClass(oAd, 'prev')[0];
            var oNext = ew.tools.getByClass(oAd, 'next')[0];
            var iNow = 0;

            var timer = setInterval(auto, 3000);

            var auto = function () {
                if (iNow === aLi.length - 1) {
                    iNow = 0;
                } else {
                    iNow += 1;
                }
                for (var i = 0; i < aLi.length; i += 1) {
                    ew.ui.fadeOut(aLi[i]);
                }
                ew.ui.fadeIn(aLi[iNow]);
            };

            var autoPrev = function () {

                if (iNow === 0) {
                    iNow = aLi.length - 1;
                }
                else {
                    iNow--;
                }

                for (var i = 0; i < aLi.length; i += 1) {
                    ew.ui.fadeOut(aLi[i]);
                }

                ew.ui.fadeIn(aLi[iNow]);

            };

            ew.tools.addEvent(prevBg, 'mouseover', function () {
                oPrev.style.display = 'block';
                clearInterval(timer);
            });
            ew.tools.addEvent(oPrev, 'mouseover', function () {
                oPrev.style.display = 'block';
                clearInterval(timer);
            });
            ew.tools.addEvent(nextBg, 'mouseover', function () {
                oNext.style.display = 'block';
                clearInterval(timer);
            });
            ew.tools.addEvent(oNext, 'mouseover', function () {
                oNext.style.display = 'block';
                clearInterval(timer);
            });
            ew.tools.addEvent(prevBg, 'mouseout', function () {
                oPrev.style.display = 'none';
                timer = setInterval(auto, 3000);
            });
            ew.tools.addEvent(oPrev, 'mouseout', function () {
                oPrev.style.display = 'none';
                timer = setInterval(auto, 3000);
            });
            ew.tools.addEvent(nextBg, 'mouseout', function () {
                oNext.style.display = 'none';
                timer = setInterval(auto, 3000);
            });
            ew.tools.addEvent(oNext, 'mouseout', function () {
                oNext.style.display = 'none';
                timer = setInterval(auto, 3000);
            });
            ew.tools.addEvent(oPrev, 'click', autoPrev);
            ew.tools.addEvent(oNext, 'click', auto);
        },
        toSel: function () {
            var sel = document.getElementById('sel1');
            var aDd = sel.getElementsByTagName('dd');
            var aUl = sel.getElementsByTagName('ul');
            var aH2 = sel.getElementsByTagName('h2');

            for (var i = 0; i < aDd.length; i++) {
                aDd[i].index = i;
                ew.tools.addEvent(aDd[i], 'click', function (ev) {
                    var ev = ev || window.event;
                    var _this = this;

                    for (var i = 0; i < aUl.length; i++) {
                        aUl[i].style.display = 'none';
                    }

                    aUl[this.index].style.display = 'block';

                    ew.tools.addEvent(document, 'click', function () {
                        aUl[_this.index].style.display = 'none';
                    });

                    ev.cancelBubble = true;
                });

            }

            for (i = 0; i < aUl.length; i++) {
                aUl[i].index = i;
                (function (ul) {
                    var aLi = ul.getElementsByTagName('li');
                    for (var i = 0; i < aLi.length; i++) {
                        aLi[i].onmouseover = function () {
                            this.className = 'active';
                        };
                        aLi[i].onmouseout = function () {
                            this.className = '';
                        };
                        aLi[i].onclick = function (ev) {
                            var ev = ev || window.event;
                            aH2[this.parentNode.index].innerHTML = this.innerHTML;
                            ev.cancelBubble = true;
                            this.parentNode.style.display = 'none';
                        }
                    }
                })(aUl[i]);
            }
        },
        toRun: function () {
            var run = document.getElementById('run');
            var oUl = run.getElementsByTagName('ul')[0];
            var aLi = oUl.getElementsByTagName('li');
            var w = aLi[0].offsetWidth;

            var prevBtn = ew.tools.getByClass(run, 'prev')[0];
            var nextBtn = ew.tools.getByClass(run, 'next')[0];

            var now = 0;

            oUl.innerHTML += oUl.innerHTML;
            oUl.style.width = aLi.length * aLi[0].offsetWidth + 'px';

            ew.tools.addEvent(prevBtn, 'click', function () {
                if (now === 0) {
                    now = aLi.length / 2;
                    oUl.style.left = -oUl.offsetWidth / 2 + 'px';
                }
                ew.ui.moveLeft(oUl, -now * w, -(now - 1) * w);
                now--;
            });

            ew.tools.addEvent(nextBtn, 'click', function () {
                if (now === aLi.length / 2) {
                    now = 0;
                    oUl.style.left = 0;
                }
                ew.ui.moveLeft(oUl, -now * w, -(now + 1) * w);

                now++;
            });
        }
    }
};

ew.app.toTip();
ew.app.toBanner();
ew.app.toSel();
ew.app.toRun();
