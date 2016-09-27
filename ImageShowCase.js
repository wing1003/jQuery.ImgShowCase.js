/*data:2016.1.
 *author:cloud.wong
 *description:This plugins is use for single product page
 *version: 1.0
 */
module.exports=function ($) {
    $.fn.BuouShowCase = function (options) {
        var opt = $.extend({
            align: "left",
            //主图
            slide_image_width: 300,
            slide_image_height: 400,
            //放大图
            source_image_width: 900,
            source_image_height: 1200,
            //放大区域
            zoom_area_width: 600,
            zoom_area_height: "justify",
            zoom_area_distance: 10,
            zoom_easing: !0,
            click_to_zoom: !1,
            zoom_element: "auto",
            //小图区域
            small_slides: 3,
            smallslide_inactive_opacity: 0.4,
            smallslide_on_hover:!1,
            smallslides_position: "bottom",
            show_begin_end_smallslide: !0,
            magnify_opacity: 0.5,
            autoplay: !0,
            autoplay_interval: 5e3,
            speed: 500,
            keyboard: !0,
            clickCallBack: function () {
                return !0;
            },
            changeCallBack: function () {
                return !0;
            }
        }, options);

        return $.each(this, function () {
            //
            var ele = $(this);
            if (ele.is("ul") && ele.children("li").length && ele.find("img.showCase_source_image").length) {
                var small_id,
                    small_image_src,
                    small_opacity = !0,
                    smallslide_css,
                    small_active_num,
                    showCase_zoom_area_css,
                    magnify_css,
                    timer,//设置延时
                    click_zoom = !1,
                    pos_width2,
                    pos_height2,
                    maginfy_time = 0,
                    ini_width = 0,
                    ini_height = 0,
                    _num=0,
                    small_image_active = !1,
                    showCase_id = ele.attr("id"),
                    iSpeedFloor = Math.floor(0.6 * opt.speed),
                    iSpeedRound = Math.round(opt.speed / 100),
                    autoplay = !1,
                    horizonal = "horizonal";

                if ("undefined" != typeof showCase_id && showCase_id) {
                    //("left" === opt.smallshowcase_position || "right" === opt.smallshowcase_position), ele.addClass("showCase_top_width").show();
                    var showCase_slide = ele.children("li").addClass("showCase_slide");
                    showCase_slide.first().show().addClass("showCase_slide_active");
                }

                var showCase_slide_length = showCase_slide.length,
                    autoplay = opt.autoplay;
                $.each(showCase_slide, function (index) {
                    index += 1;
                    var ele = $(this),
                        showCase_slide_image = ele.find(".showCase_slide_image").show(),
                        showCase_source_image = ele.find(".showCase_source_image"),
                        img_link = ele.find("a");
                    ele.data("id", index).addClass("slide_" + index),
                    //图片异常处理
                    !showCase_slide_image.length && showCase_source_image.length ? ele.prepend("<img class='showCase_slide_image' src=" + showCase_source_image.attr("src") + "/>") : showCase_slide_image.length || showCase_source_image.length || ele.remove(), img_link.length && ele.find(".showCase_slide_image").data("anchor", img_link.attr("href"))
                });

                var showCase_slide_image = showCase_slide.find(".showCase_slide_image").css({
                    width: opt.slide_image_width,
                    height: opt.slide_image_height
                }).show();
                $.each(showCase_slide_image, function () {
                    $(this).data("src", this.src);
                });
                //图片放大镜
                var magnify = $('<li class="showCase_magnify"><div><img /></div></li>').appendTo(ele),
                    magnify_area = magnify.children("div"),
                    magnify_image = magnify_area.children("img"),
                    showCase_zoom_area,
                    zoom_element = opt.zoom_element;

                "auto" !== zoom_element && zoom_element && $(zoom_element).length ? showCase_zoom_area = $(zoom_element).addClass("showCase_zoom_area").html("<div><img class='showCase_zoom_image'/></div>") : (zoom_element == "auto", showCase_zoom_area = $('<li class="showCase_zoom_area"><div><img class="showCase_zoom_image" /></div></li>').appendTo(ele));
                // console.log($(zoom_element));
                var zoom_area = showCase_zoom_area.children("div"),
                    zoom_image = zoom_area.children(".showCase_zoom_image").css({
                        width: opt.source_image_width,
                        height: opt.source_image_height
                    });

                //小图片轮播
                var showCase_small_slides,//小轮播最外层的li
                    showCase_small_slideUL,
                    showCase_small_slideLI,
                    showCase_small_slideImg,
                    showCase_small_slide_length,
                    showcase_small_opacity,
                    small_slides = opt.small_slides;
                (showCase_slide_length >= 1) && (showCase_small_slides = $('<li class="showCase_small_slides"><ul></ul></li>').appendTo(ele), showCase_small_slideUL = showCase_small_slides.children("ul"), $.each(showCase_slide_image, function () {
                    var ele = $(this);
                    small_image_src = ele.data("src"), small_id = ele.parents(".showCase_slide").data("id"), $('<li><img class="showCase_small_slide" src="' + small_image_src + ' "/></li>').data("slide_id", small_id).appendTo(showCase_small_slideUL);
                }),
                showCase_small_slideLI = showCase_small_slideUL.children("li").css({
                    opacity: opt.smallslide_inactive_opacity
                }),
                showCase_slide_length> small_slides?(showCase_small_slideLI.eq(0).addClass("showCase_smallslide_first showCase_smallslide_active").css({
                    opacity: 1
                }), showCase_small_slideLI.eq(small_slides - 1).addClass("showCase_smallslide_last")) :
                showCase_small_slideLI.eq(0).addClass("showCase_smallslide_active").css({
                    opacity: 1
                }),
                $.each(showCase_small_slideLI, function (num) {
                    $(this).data("id", num + 1);
                }),
                showCase_small_slideImg = showCase_small_slideLI.children("img"),
                showCase_small_slide_length = showCase_small_slideLI.length),
                small_opacity = small_opacity ? 1 : opt.magnify_opacity;

                //description:构建参数 实际的尺寸大小
                var slide_image_borderWidth = parseInt(showCase_slide.css("borderLeftWidth"), 10) + parseInt(showCase_slide.css("borderRightWidth"), 10) + parseInt(showCase_slide_image.css("borderLeftWidth"), 10) + parseInt(showCase_slide_image.css("borderRightWidth"), 10),
                    slide_marginWidth = parseInt(showCase_slide.css("marginLeft"), 10) + parseInt(showCase_slide.css("marginRight"), 10),
                    slide_image_paddingWidth = parseInt(showCase_slide.css("paddingLeft"), 10) + parseInt(showCase_slide.css("paddingRight"), 10) + parseInt(showCase_slide_image.css("marginLeft"), 10) + parseInt(showCase_slide_image.css("marginRight"), 10) + parseInt(showCase_slide_image.css("paddingLeft"), 10) + parseInt(showCase_slide_image.css("paddingRight"), 10),
                    slide_li_width = opt.slide_image_width + slide_image_borderWidth + slide_marginWidth + slide_image_paddingWidth,
                    slide_li_height = opt.slide_image_height + slide_image_borderWidth + slide_marginWidth + slide_image_paddingWidth,

                    smallslide_image_borderWidth = 0,
                    smallslide_marginTop = 0,
                    smallslide_image_paddingWidth = 0,
                    small_image_width = 0,
                    small_image_height = 0,
                    small_slide_width = 0,
                    small_slide_height = 0;

                smallslide_image_borderWidth = parseInt(showCase_small_slideLI.css("borderLeftWidth"), 10) + parseInt(showCase_small_slideLI.css("borderRightWidth"), 10) + parseInt(showCase_small_slideImg.css("borderLeftWidth"), 10) + parseInt(showCase_small_slideImg.css("borderRightWidth"), 10),
                smallslide_marginTop = parseInt(showCase_small_slideLI.css("marginTop"), 10),
                smallslide_image_paddingWidth = parseInt(showCase_small_slideLI.css("paddingLeft"), 10) + parseInt(showCase_small_slideLI.css("paddingRight"), 10) +
                                 parseInt(showCase_small_slideImg.css("marginLeft"), 10) + parseInt(showCase_small_slideImg.css("marginRight"), 10) + parseInt(showCase_small_slideImg.css("paddingLeft"), 10) + parseInt(showCase_small_slideImg.css("paddingRight"), 10),

                (small_image_width = Math.round((slide_li_width - (small_slides - 1) * smallslide_marginTop) / small_slides) - (smallslide_image_borderWidth + smallslide_image_paddingWidth),
                small_image_height = Math.round(opt.slide_image_height * small_image_width / opt.slide_image_width),
                small_slide_width = small_image_width + smallslide_image_borderWidth + smallslide_image_paddingWidth, small_slide_height = small_image_height + smallslide_image_borderWidth + smallslide_image_paddingWidth);
                //console.log(small_image_width);
                var zoom_area_width,
                    zoom_area_height,
                    showCase_zoom_area_border_top_width = parseInt(showCase_zoom_area.css("borderTopWidth"), 10),
                    zoom_area_distance = parseInt(opt.zoom_area_distance, 10),
                    showCase_zoom_area_padding_top = parseInt(showCase_zoom_area.css("paddingTop"), 10);
                zoom_area_width = opt.zoom_area_width - 2 * showCase_zoom_area_border_top_width - 2 * showCase_zoom_area_padding_top > opt.source_image_width ? opt.source_image_width : opt.zoom_area_width - 2 * showCase_zoom_area_border_top_width - 2 * showCase_zoom_area_padding_top,
                zoom_area_height = "justify" === opt.zoom_area_height ? slide_li_height + smallslide_marginTop + small_slide_height - 2 * showCase_zoom_area_border_top_width - 2 * showCase_zoom_area_padding_top : opt.zoom_area_height - 2 * showCase_zoom_area_border_top_width - 2 * showCase_zoom_area_padding_top, zoom_area_height > opt.source_image_height && (zoom_area_height = opt.source_image_height);

                var magnify_border_top_width = parseInt(magnify.css("borderTopWidth"), 10),
                    showCase_top_width = parseInt(showCase_slide.css("borderTopWidth"), 10) + parseInt(showCase_slide.css("marginTop"), 10) + parseInt(showCase_slide.css("paddingTop"), 10) + parseInt(showCase_slide_image.css("borderTopWidth")) + parseInt(showCase_slide_image.css("marginTop"), 10) - magnify_border_top_width,
                    showCase_slide_image_width = showCase_slide_image.offset().left - ele.offset().left - magnify_border_top_width;

                var magnify_area_width = Math.round(zoom_area_width * (opt.slide_image_width / opt.source_image_width)),
                    magnify_area_height = Math.round(zoom_area_height * (opt.slide_image_height / opt.source_image_height)),
                    magnify_dis_height = showCase_top_width + opt.slide_image_height - magnify_area_height,
                    magnify_dis_width = showCase_slide_image_width + opt.slide_image_width - magnify_area_width,
                    maginfy_half_width = Math.round(magnify_area_width / 2),
                    maginfy_half_height = Math.round(magnify_area_height / 2);
                zoom_area.css({
                    width: zoom_area_width,
                    height: zoom_area_height
                }),
                showCase_zoom_area_css = {
                    margin: 0,
                    opacity: 0
                },
                "auto" === zoom_element && (showCase_zoom_area_css.left = slide_li_width + zoom_area_distance),
                showCase_zoom_area.css(showCase_zoom_area_css).hide(),
                magnify_image.css({
                    margin: 0,
                    padding: 0,
                    width: opt.slide_image_width,
                    height: opt.slide_image_height
                }),
                showCase_small_slideUL.css({
                    width: (small_slide_width + smallslide_marginTop) * showCase_small_slide_length + 100
                }),
                magnify_area.css({
                    margin: 0,
                    padding: 0,
                    width: magnify_area_width,
                    height: magnify_area_height
                }),
                magnify_css = {
                    margin: 0,
                    padding: 0
                },
                showCase_small_slideImg.css({
                    width: small_image_width,
                    height:small_image_height
                }),
                showCase_small_slideLI.css({
                    margin: 0,
                    marginRight: smallslide_marginTop
                }),
                magnify.css(magnify_css).hide();
                if ("horizonal" === horizonal) {
                    smallslide_css = {
                        width: slide_li_width
                    };
                    "bottom" === opt.smallslides_position ? (smallslide_css.top = slide_li_height + smallslide_marginTop, showCase_small_slides.css(smallslide_css)) : !0;
                }

                var showCase_slide_image_first = showCase_slide.first().find(".showCase_slide_image"),
                    showCase_source_image_first = showCase_slide.first().find(".showCase_source_image");
                magnify_image.attr("src", showCase_slide_image_first.attr("src")).show(),
                zoom_image.attr("src", showCase_source_image_first.attr("src"));

                //定义功能函数
                //设定延时器
                var setTimer = function () {
                    timer && clearTimer(),
                    timer = setInterval(function () {
                        smallSlideImageShowRight()
                    }, opt.autoplay_interval);
                },
                //清除延时器
                clearTimer = function () {
                    timer && (clearInterval(timer), timer = !1)
                },
                //放大镜透明度
                magnifyOpacity = function () {
                    magnify.stop().fadeTo(iSpeedFloor, small_opacity), showCase_zoom_area.stop().show().animate({
                        opacity: 1
                    }, iSpeedFloor), showCase_slide_image_first.stop().animate({
                        opacity: opt.magnify_opacity
                    }, iSpeedFloor),
                    autoplay && clearTimer();
                },
                //放大镜移出
                magnifyOut = function () {
                    magnify.stop().fadeOut(opt.speed), showCase_zoom_area.stop().animate({
                        opacity: 0
                    }, opt.speed, function () {
                        $(this).hide()
                    }), showCase_slide_image_first.stop().animate({
                        opacity: 1
                    }, opt.speed, function () {
                        opt.click_to_zoom && (click_zoom = !1)
                    }), clearTimeout(maginfy_time), autoplay && setTimer();
                },
                //小图随大图改变
                smallAllChange = function (small_li, small_bool) {
                    var element,
                        small_index,
                        small_active_num = ele.find(".showCase_smallslide_active").removeClass("showCase_smallslide_active");
                    small_li.addClass("showCase_smallslide_active"), magnify.stop().hide(), showCase_zoom_area.stop().hide(), small_bool || ( small_active_num.stop(!0, !0).animate({
                        opacity: opt.smallslide_inactive_opacity  //0.4
                    }, iSpeedFloor), small_li.stop(!0, !0).animate({
                        opacity: 1
                    }, iSpeedFloor)),
                    ele.find(".showCase_slide_active").removeClass("showCase_slide_active").stop().animate({
                        opacity: 0
                    }, opt.speed, function () {
                        $(this).hide()
                    }),
                    element = showCase_slide.filter(".slide_" + small_li.data("slide_id")).addClass("showCase_slide_active").show().stop().css({
                        opacity: 0
                    }).animate({
                        opacity: 1
                    }, opt.speed),
                    showCase_slide_image_first = element.find(".showCase_slide_image"), showCase_source_image_first = element.find(".showCase_source_image"),
                    magnify_image.attr("src", showCase_slide_image_first.data("src")),
                    zoom_image.attr("src", showCase_slide_image_first.data("src")),
                    autoplay && (clearTimer(), setTimer()),
                    small_index = small_li.data("id"), showCase_slide_length >= small_slides && small_index--, change_call(small_index);
                },
                //小图切换效果
                smallChange = function (dis_width, small_position, small_active, showCase) {
                    $.each(showCase_small_slideLI, function () {
                        var ele = $(this),
                        small_active = {
                            opacity: opt.smallslide_inactive_opacity
                        };
                        ele.data("id") === showCase.data("id") && (small_active.opacity = 1),
                        small_active.left = "-=" + dis_width,
                        ele.animate(small_active, iSpeedFloor, "swing", function () {
                           (showCase.addClass("showCase_smallslide_active"))
                        });
                    }), smallAllChange(showCase, !0)
                },
                //放大图片的位置
                zoomImagePosition = function () {
                    var cal_width = pos_width2 - ini_width,
                        cal_height = pos_height2 - ini_height,
                        sp_width = -cal_width / iSpeedRound,
                        sp_height = -cal_height / iSpeedRound;
                    ini_width -= sp_width, ini_height -= sp_height, 1 > cal_width && cal_width > -1 && (ini_width = pos_width2), 1 > cal_height && cal_height > -1 && (ini_height = pos_height2), zoom_image.css({
                        left: ini_width,
                        top: ini_height
                    }), (cal_width > 1 || cal_height > 1 || 1 > cal_width || 1 > cal_height) && (maginfy_time = setTimeout(function () {
                        zoomImagePosition()
                    }, 25))
                },
                //最右边时候展示
                smallSlideImageShowRight = function () {
                    var small_slide_length;
                    if (ele.find(".showCase_slide_active").mouseleave()) {
                        if (small_slide_length = ele.find(".showCase_smallslide_active").next(), !small_slide_length.length) {
                            return showCase_slide_length > small_slides ? start() : showCase_small_slideLI.first().trigger("click"), !0
                        } 
                    }
                    else if (small_slide_length = ele.find(".showCase_smallslide_active").prev(), !small_slide_length.length) {
                        return showCase_slide_length > small_slides ? end() : showCase_small_slideLI.last().trigger("click"), !0
                    }
                    small_slide_length.trigger("click")
                },
                //最左边时候展示
                smallSlideImageShowLeft = function () {
                    var small_slide_length;
                    if (ele.find(".showCase_slide_active").mouseleave()) {
                        if (small_slide_length = ele.find(".showCase_smallslide_active").prev(), !small_slide_length.length) {
                            return showCase_slide_length > small_slides ? end() : showCase_small_slideLI.last().trigger("click"), !0
                        }  
                    }
                    else if (small_slide_length = ele.find(".showCase_smallslide_active").next(), !small_slide_length.length) {
                        return showCase_slide_length > small_slides ? start() : showCase_small_slideLI.first().trigger("click"), !0
                    }
                    small_slide_length.trigger("click")
                };
               //
               //whichFirst = function (index) {
               //    (small_slides >= showCase_slide_length || opt.show_begin_end_smallslide) && (index -= 1);
               //    var active_slide = showCase_small_slideLI.eq(index);
               //    if (active_slide.length) {
               //        var _num, small_active = ele.find(".showCase_smallslide_active"),
               //            small_id = small_active.data("id") - 1;
               //        if (small_id > index) {
               //            num =small_id - index;
               //            var first = ele.find(".showCase_smallslide_first"),
               //                first_id = first.data("id");
               //            first_id > index ? (_num = small_id - first_id, num -= _num, first.trigger("click")) : smallAllChange(active_slide, !1)
               //        }
               //        else if (index > small_id) {
               //            num = index - small_id;
               //            var last = ele.find(".showCase_smallslide_last"),
               //                last_id = last.data("id") - 1;
               //            index >= last_id ? (_num = last_id - small_id - 1, num -= _num, last.trigger("click")) : smallAllChange(active_slide, !1)
               //        }
               //    }
               //};
                window[showCase_id + "_previous"] = function () { slideImageShowRight() },
                window[showCase_id + "_next"] = function () { slideImageShowLeft() };
               // window[showCase_id + "_show"] = function (indexNum) { whichFirst(indexNum) };

                var click_call = function (ele) {
                    if (!opt.clickCallBack(ele, showCase_id)) {
                        return !1;
                    }
                    var obj = obj || null;
                    return "function" == typeof obj ? (obj(ele, showCase_id), !1) : !0
                },
                change_call = function (ele) {
                    if (opt.changeCallBack(ele, showCase_id)) {
                        var obj = obj || null;
                        "function" == typeof obj && obj(ele, showCase_id);
                    }
                };
                //放大镜
                showCase_slide.add(magnify).mouseenter(function () {
                    magnifyOpacity();
                }).mouseleave(function () {
                    magnifyOut();
                });

                var pos_width = -(opt.source_image_width - zoom_area_width),
                    pos_height = -(opt.source_image_height - zoom_area_height);

                //控制放大镜相对位置
                showCase_slide.add(magnify).mousemove(function (ev) {
                    var offsetX = Math.round(ev.pageX - showCase_slide_image_first.offset().left + showCase_slide_image_width),
                        offsetY = Math.round(ev.pageY - showCase_slide_image_first.offset().top + showCase_top_width),
                        disX = offsetX - maginfy_half_width,
                        disY = offsetY - maginfy_half_height;
                    if (showCase_slide_image_width > disX && (disX = showCase_slide_image_width), disX > magnify_dis_width && (disX = magnify_dis_width), showCase_top_width > disY && (disY = magnify_border_top_width), disY > magnify_dis_height && (disY = magnify_dis_height), magnify.css({
                        left: disX,
                        top: disY
                    })) {
                        var disX_showCase = disX - showCase_slide_image_width,
                            disY_showCase = disY - showCase_top_width;
                        magnify_image.css({
                            left: -disX_showCase,
                            top: -disY_showCase
                        });
                    }
                    pos_width2 = -((disX - showCase_slide_image_width) * (1 / (opt.slide_image_width / opt.source_image_width))),
                    pos_height2 = -((disY - showCase_top_width) * (1 / (opt.slide_image_height / opt.source_image_height))),
                    pos_width > pos_width2 && (pos_width2 = pos_width), pos_height > pos_height2 && (pos_height2 = pos_height), opt.zoom_easing ? (clearTimeout(maginfy_time), zoomImagePosition()) : zoom_image.css({
                        left: pos_width2,
                        top: pos_height2
                    })
                });

                //点击小图选择起始
                var choiceFirstLast = function (position) {
                    _num = _num ? _num - 1 : 0;
                    //f = !0;
                    var reFirst,
                        reLast,
                        ele_active,
                        distance,
                        ele_first = ele.find(".showCase_smallslide_first").removeClass("showCase_smallslide_first"),
                        ele_last = ele.find(".showCase_smallslide_last").removeClass("showCase_smallslide_last");

                    "left" === position ?
                    (reFirst = ele_first.prev().addClass("showCase_smallslide_first"), reLast = ele_last.prev().addClass("showCase_smallslide_last"), ele_active = ele_first) :
                    (reFirst = ele_first.next().addClass("showCase_smallslide_first"), reLast = ele_last.next().addClass("showCase_smallslide_last"), ele_active = ele_last),
                    _num ? ("left" === position ? reFirst.trigger("click") : reLast.trigger("click")) :
                    (distance = reFirst.position().left, smallChange(distance, reFirst, reLast, ele_active))
                },
                    //自动轮播选择小图切换首元素和尾元素
                    autoFirstLast = function (position) {
                        //autoplay = !0;
                        {
                            var refirst,
                            reLast,
                            ele_first;
                            ele.find(".showCase_smallslide_first").removeClass("showCase_smallslide_first"),
                            ele.find(".showCase_smallslide_last").removeClass("showCase_smallslide_last")
                        }

                        "start" === position ? (refirst = showCase_small_slideLI.eq(0).addClass("showCase_smallslide_first"),
                        reLast = showCase_small_slideLI.eq(small_slides - 1).addClass("showCase_smallslide_last"),
                        (ele_first = refirst)) : !1;
                        var refirstLeft = refirst.position().left;
                        smallChange(refirstLeft, refirst, reLast, ele_first);
                    },
                    //轮播开始
                    start = function () {
                        autoFirstLast("start")
                    },
                    end = function () {
                        autoFirstLast("end")
                    };

                (showCase_slide_length > 1) && (showCase_small_slideLI.click(function () {
                    var ele = $(this);
                    if (!ele.hasClass("showCase_smallslide_active")) {
                        if (ele.hasClass("showCase_smallslide_first") && ele.prev().length) {
                            choiceFirstLast("left");
                        }
                        else if (ele.hasClass("showCase_smallslide_last") && ele.next().length) {
                            choiceFirstLast("right")
                        }
                        else {
                            if (_num && !$(this).next().length) {
                                return end(), !0;
                            }
                            if (_num && !$(this).prev().length) {
                                return start(), !0;
                            }
                            smallAllChange(ele, !1)
                        }
                    }     
                   
                }),opt.smallslide_on_hover&& showCase_small_slideLI.mouseenter(function () {
                    $(this).trigger("click")
                })), 

                opt.click_to_zoom ? showCase_slide.click(function () {
                    magnifyOpacity()
                }) : magnify.click(function () {
                    var ele = showCase_slide_image_first.data("anchor");
                    ele && click_call(ele) && (window.location = ele)
                }), showCase_slide_length > 1 && opt.keyboard && $(document).keydown(function (ev) {
                    (39 === ev.keyCode || "39" === ev.keyCode) && smallSlideImageShowRight(),
                    (37 === ev.keyCode || "37" === ev.keyCode) && smallSlideImageShowLeft()
                }), $(window).on("load", function () {
                    showCase_slide.css({
                        "background-image": "none"
                    }), showCase_zoom_area.css({
                        "background-image": "none"
                    })
                }),autoplay &&setTimer()
            }
        }),this
    }
}(jQuery);
