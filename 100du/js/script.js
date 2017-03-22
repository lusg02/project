$(function () {
    //搜索切换
    (function () {
        var aLi = $('#search-menu li');
        var oText = $('#search').find('.form .search-text');
        var arrText = [
            '例如：荷棠鱼坊烧鱼 或 樱花日本料理',
            '例如：昌平区育新站龙旗广场2号楼609室',
            '例如：万达影院双人情侣券',
            '例如：东莞出事了，大老虎是谁？',
            '例如：北京初春降雪，天气变幻莫测'
        ];
        var iNow = 0;
        oText.val(arrText[iNow]);

        aLi.each(function (index) {
            $(this).click(function () {
                //console.log(index);
                aLi.attr('class', 'gradient');
                $(this).attr('class', 'active');
                iNow = index;
                oText.val(arrText[iNow]);
            });
        });

        oText.focus(function () {
            //console.log(arrText[iNow]);
            if ($(this).val() === arrText[iNow]) {
                $(this).val('');
            }
        });
        oText.blur(function () {
           if ($(this).val() === '') {
               oText.val(arrText[iNow]);
           }
        });
    })();
    
})
