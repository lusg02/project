;(function ($) {

  var Carousel = function (poster) {

    var _self = this;
    // 保存单个旋转木马对象
    this.poster = poster;
    this.poster_list = poster.find('ul.poster-list');
    this.next_btn = poster.find('div.poster-next-btn');
    this.prev_btn = poster.find('div.poster-prev-btn');
    this.poster_items = poster.find('li.item');
    if (this.poster_items.size() % 2 === 0) {
      this.poster_list.append(this.poster_items.first().clone());
      this.poster_items = this.poster_list.children();
    }
    this.poster_first_item = this.poster_items.first(); // 第一帧
    this.poster_last_item = this.poster_items.last(); // 最后一帧

    this.is_rotate = true;

    // 默认配置参数
    this.settings = {
      "width": 900,     // 幻灯片宽度
      "height": 270,    // 幻灯片高度
      "poster_w": 640,  // 第一帧的宽度
      "poster_h": 270,
      "scale": 0.9,
      "speed": 500,
      "autoPlay": false,
      "delay": 5000,
      "vertical": "middle"
    };

    $.extend(this.settings, this.getSettings());

    // 设置配置参数
    this.setSettings();

    this.set_posters_pos();

    this.next_btn.click(function () {
      if (_self.is_rotate) {
        _self.rotate('left');
        _self.is_rotate = false;
      }
    });
    this.prev_btn.click(function () {
      if (_self.is_rotate) {
        _self.rotate('right');
        _self.is_rotate = false;
      }
    });

    // 自动播放
    if (this.settings.autoPlay) {
      this.auto_play();
      this.poster.hover(function () {
        window.clearInterval(_self.timer);
      }, function () {
        _self.auto_play();
      })
    }
  };

  Carousel.prototype = {

    auto_play: function () {
      var _self = this;
      this.timer = window.setInterval(function () {
        _self.next_btn.click();
      }, this.settings.delay);
    },

    // 设置帧的位置关系
    set_posters_pos: function () {
      var _self = this;
      var slice_items = this.poster_items.slice(1),
          slice_size = slice_items.size() / 2,
          slice_right = slice_items.slice(0, slice_size),
          slice_left = slice_items.slice(slice_size),
          level = Math.floor(this.poster_items.size() / 2);

      // 设置右侧帧到的参数
      var rw = this.settings.poster_w,
          rh = this.settings.poster_h,
          gap = (this.settings.width - this.settings.poster_w) / 2 / level;

      var first_left = (this.settings.width - this.settings.poster_w) / 2,
          fix_offset_left = first_left + rw;

      var widthArr = [], heightArr = [];

      slice_right.each(function (i) {
        level--;
        rw = rw * _self.settings.scale;
        widthArr.push(rw);
        heightArr.push(rh);
        rh = rh * _self.settings.scale;

        var j = i;
        $(this).css({
          zIndex: level,
          width: rw,
          height: rh,
          opacity: 1 / (++j),
          left: fix_offset_left + (++i) * gap - rw,
          top: _self.set_vertical_align(rh)
        });
      });

      // 左侧
      var lw = slice_right.last().width(),
          lh = slice_right.last().height(),
          opacity_loop = Math.floor(this.poster_items.size() / 2);
      slice_left.each(function (i) {

        $(this).css({
          zIndex: i,
          width: lw,
          height: lh,
          opacity: 1 / opacity_loop,
          left: i * gap,
          top: _self.set_vertical_align(lh)
        });
        lw = lw / _self.settings.scale;
        lh = lh / _self.settings.scale;
        opacity_loop--;
      });
    },

    // 设置垂直排列对齐
    set_vertical_align: function (height) {
      var vertical = this.settings.vertical,
          top = 0;
      if (vertical === 'middle') {
        top = (this.settings.height - height) / 2;
      } else if (vertical === 'top') {
        top = 0;
      } else if (vertical === 'bottom') {
        top = this.settings.height - height;
      } else {
        top = (this.settings.height - height) / 2;
      }

      return top;
    },

    // 设置配置参数
    setSettings: function () {
      this.poster.css({
        width: this.settings.width,
        height: this.settings.height
      });
      this.poster_list.css({
        width: this.settings.width,
        height: this.settings.height
      });
      // 计算切换按钮的宽度
      var w = (this.settings.width - this.settings.poster_w) / 2;
      this.next_btn.css({
        width: w,
        height: this.settings.height,
        zIndex: Math.ceil(this.poster_items.size() / 2)
      });
      this.prev_btn.css({
        width: w,
        height: this.settings.height,
        zIndex: Math.ceil(this.poster_items.size() / 2)
      });
      this.poster_first_item.css({
        width: this.settings.poster_w,
        height: this.settings.poster_h,
        left: w,
        zIndex: Math.floor(this.poster_items.size() / 2)
      });
    },

    // 获取人工配置参数
    getSettings: function () {
      var settings = this.poster.attr('data-settings');
      if (settings && settings !== '') {
        return $.parseJSON(settings);
      } else {
        return {};
      }

    },

    // 旋转
    rotate: function (dir) {

      var _this = this;
      var z_index_arr = [];

      if (dir === 'left') {
        this.poster_items.each(function () {
          var _self = $(this);
          var prev = _self.prev().get(0) ? _self.prev() : _this.poster_last_item;
          var width = prev.width(),
              height = prev.height(),
              zIndex = prev.css('zIndex'),
              opacity = prev.css('opacity'),
              top = prev.css('top'),
              left = prev.css('left');

          z_index_arr.push(zIndex);

          _self.animate({
            width: width,
            height: height,
            // zIndex: zIndex,
            opacity: opacity,
            top: top,
            left: left
          }, _this.settings.speed, function () {
            _this.is_rotate = true;
          });
        });

        this.poster_items.each(function (i) {
          $(this).css('zIndex', z_index_arr[i]);
        })

      } else if (dir === 'right') {
        this.poster_items.each(function () {
          var _self = $(this);
          var next = _self.next().get(0) ? _self.next() : _this.poster_first_item;
          var width = next.width(),
              height = next.height(),
              zIndex = next.css('zIndex'),
              opacity = next.css('opacity'),
              top = next.css('top'),
              left = next.css('left');
          z_index_arr.push(zIndex);
          _self.animate({
            width: width,
            height: height,
            // zIndex: zIndex,
            opacity: opacity,
            top: top,
            left: left
          }, _this.settings.speed, function () {
            _this.is_rotate = true;
          });
        });

        this.poster_items.each(function (i) {
          $(this).css('zIndex', z_index_arr[i]);
        })
      }
    }


  };

  Carousel.init = function (posters) {
    var _this = this;

    posters.each(function () {
      new _this($(this));
    })

  };

  window['Carousel'] = Carousel;

})(jQuery);
