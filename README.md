1. CSS3照片墙demo
   <br>
2. slide demo
   <br>
3. sidebarScrolling demo
4. resizeable demo
5. toolbar demo
   - 三种实现方式：CSS精灵、图标字体和伪类
   - 用到的知识点
     - SASS
       1. 嵌套
       2. $变量
       3. @mixin 函数名(参数)
       4. @import
       5. @extend
     - RequireJs
       1. requirejs.config
              requirejs.config({  paths: {    jquery: 'jquery-1.11.3.min'  }});
       2. requirejs
              requirejs(['jquery', function ($) {  }]);
       3. define
              define(['jquery'], function ($) {  return {      };})
     - CSS3
       1. transition
       2. transform
       3. transform-origin
     - jQuery
       1. $.extend()
              this.opts = $.extend({}, ScrollTo.DEFAULTS, opts);
       2. $.proxy()
              this.$el.on('click', $.proxy(this._move, this));
       3. $.fn.extend()
              $.fn.extend({
                backtop: function (opts) {
                  this.each(function () {
                    new BackTop(this, opts);
                  });
                }
                
                return this;
              })
          
