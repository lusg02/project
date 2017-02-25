1. [CSS3照片墙demo](https://lusg02.github.io/Exercises/photowall.html#bg3)
   <br>

2. [slide demo](https://lusg02.github.io/Exercises/slide/index.html)
   <br>

3. [sidebarScrolling demo](https://lusg02.github.io/Exercises/Sidebar%20Rolling/index.html)

4. [resizeable demo](https://lusg-2.github.io/exercises/resizeable/index.html)

5. [toolbar demo](https://lusg02.github.io/Exercises/tollbar/index.html)

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

          ```
          requirejs.config({  
            paths: {    
             jquery: 'jquery-1.11.3.min'  
            }
          });
          ```

       2. requirejs

          ```
          requirejs(['jquery', function ($) {}]);
          ```

       3. define

          ```
          define(['jquery'], function ($) { return {}; })
          ```

     - CSS3
     

       1. transition
       2. transform
       3. transform-origin

     - jQuery
     

       1. $.extend()

          ```javascript
          this.opts = $.extend({}, ScrollTo.DEFAULTS, opts);
          ```

       2. $.proxy()

          ```javascript
          this.$el.on('click', $.proxy(this._move, this));
          ```

       3. $.fn.extend()

          ```javascript
          $.fn.extend({
            backtop: function (opts) {
              this.each(function () {
                new BackTop(this, opts);
              });
            }
            
            return this;
          })
          ```
