# ImgShowCase
基于JQuery电商网站的轮播及放大镜效果的插件
## html
```html
<ul id="showCase" class="showCase">
  <#list bigPicList as bigPic>
  <li>
    <img src="${imgDomain}/${slidePic}" class="showCase_slide_image"/>
    <img src="${imgDomain}/${bigPic}" class="showCase_source_image"/>
  </li>
  </#list>
</ul>
```
## javascript
```javascript
(function(){
    	//图片放大效果
        $("#showCase").BuouShowCase({
            slide_image_width: 300,
            slide_image_height: 300,
            source_image_width: 1000,
            source_image_height: 1000,
            autoplay: !1,
            zoom_area_distance:50,
            zoom_area_width: 500,
            zoom_area_height: 500,
            small_slides: 5,
            show_begin_end_smallthumb: !1
    	});
})();
```
