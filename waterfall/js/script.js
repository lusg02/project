/**
 * Created by Administrator on 2016/12/9.
 */
window.onload = function () {
    var data = {"data": [{"src": "1.jpg"},{"src": "2.jpg"},{"src": "3.jpg"},{"src": "4.jpg"},{"src": "5.jpg"}]};
    waterfall('main','pic');
    window.onscroll = function () {
        if (checkScroll()){
            var oParent = document.getElementById('main');
            for (var i=0; i<data.data.length; i++){
                var oPic = document.createElement('div');
                oPic.className = 'pic';
                oParent.appendChild(oPic);

                var oBox = document.createElement('div');
                oBox.className = 'box';
                oPic.appendChild(oBox);

                var oImg = document.createElement('img');
                oImg.src = 'images/' + data.data[i].src;

                oBox.appendChild(oImg);
            }
            waterfall('main','pic');
        }
    }
}

function waterfall(parent,pic) {
    var oParent = document.getElementById(parent);
    var aPic = getByClass(oParent,'pic');
    var iPicW = aPic[0].offsetWidth;
    var cols = Math.floor(document.documentElement.clientWidth/iPicW);//列数
    var aPicH = [];//存储每列块相加的高度
    oParent.style.cssText = 'width:' + iPicW*cols + 'px; margin: 0 auto';//设置居中样式

    for (var i=0; i<aPic.length; i++){
        var iPicH = aPic[i].offsetHeight;
        if (i<cols){
            aPicH[i] = iPicH;//第一行的高度添加至数组aPicH
        }else {
            var minH = Math.min.apply(null,aPicH);//得到aPicH中高度最小项
            var minHIndex = getminHIndex(aPicH,minH);
            aPic[i].style.position = 'absolute';
            aPic[i].style.top = minH + 'px';
            aPic[i].style.left = aPic[minHIndex].offsetLeft + 'px';
            aPicH[minHIndex] += aPic[i].offsetHeight;
        }
    }

}

function getminHIndex(arr,min) {
    for(var i in arr){
        if(arr[i] === min){
            return i;
        }
    }
}

function getByClass(parent,className) {
    var aEles = parent.getElementsByTagName('*');
    var result = [];
    for (var i=0; i<aEles.length; i++){
        if(aEles[i].className === className){
            result.push(aEles[i]);
        }
    }
    return result;
}

function checkScroll() {
    var oParent = document.getElementById('main');
    var aPic = getByClass(oParent,'pic');
    var lastPicH = aPic[aPic.length-1].offsetTop + Math.floor(aPic[aPic.length-1].offsetHeight/2);
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var docH = document.documentElement.clientHeight || document.body.clientHeight;
    return (lastPicH<scrollTop+docH) ? true : false;
}