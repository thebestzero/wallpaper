## swiper
|indicator-dots	|Boolean				|false	|是否显示面板指示点	|													|
|:-:|:-:					|:-:	|:-:				|:-:												|
|indicator-color	|Color					|rgba(0, 0, 0, .3)|指示点颜色			|													|
|indicator-active-color	|Color	|#000000			|当前选中的指示点颜色								|
|autoplay	|Boolean				|false	|是否自动切换		|													|
|:-:|:-:					|:-:	|:-:				|:-:												|
|current	|Number					|0		|当前所在滑块的 index|													|
|current-item-id	|String					|		|当前所在滑块的 item-id ，不能与 current 被同时指定|支付宝小程序不支持									|
|interval	|Number					|5000	|自动切换时间间隔	|													|
|duration	|Number					|500	|滑动动画时长		|app-nvue不支持										|
|circular				|Boolean|false				|是否采用衔接滑动，即播放到末尾后重新回到开头		|


## 毛玻璃特性
backdrop-filter 是 CSS 中的一个属性，用于为元素后面的区域添加模糊或颜色调整等滤镜效果。
它可以创建出一种类似于毛玻璃的效果，让元素背后的内容呈现出特殊的视觉效果。


## tabbar
|color	|HexColor	|是	|	|tab 上的文字默认颜色	||
|:-:|:-:				|:-:		|:-:|:-:																														|:-:																											|
|selectedColor	|HexColor			|是			|	|tab 上的文字选中时的颜色																									|																												|
|backgroundColor	|HexColor			|是			|	|tab 的背景色																												|																												|
|borderStyle	|String				|否			|black|tabbar 上边框的颜色，可选值 black/white，black对应颜色rgba(0,0,0,0.33)，white对应颜色rgba(255,255,255,0.33)。				|App 2.3.4+ 、H5 3.0.0+																							|
|blurEffect	|String				|否			|none|iOS 高斯模糊效果，可选值 dark/extralight/light/none（参考:使用说明）														|App 2.4.0+ 支持、H5 3.0.0+（只有最新版浏览器才支持）															|
|list				|Array		|是	|																															|tab 的列表，详见 list 属性说明，最少2个、最多5个 tab															|
|pagePath			|String		|是	|页面路径，必须在 pages 中先定义																							|																												|
|:-:				|:-:		|:-:|:-:																														|:-:																											|
|text				|String		|是	|tab 上按钮文字，在 App 和 H5 平台为非必填。例如中间可放一个没有文字的+号图标												|																												|
|iconPath			|String		|否	|图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px，当 position 为 top 时，此参数无效，不支持网络图片，不支持字体图标	|																												|
|selectedIconPath|String|否																															|选中时的图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px ，当 position 为 top 时，此参数无效				|


## 条件编译
条件编译是用特殊的注释作为标记，在编译时根据这些特殊的注释，将注释里面的代码编译到不同平台。

使用方法
以 #ifdef 或 #ifndef 加 %PLATFORM% 开头，以 #endif 结尾。
|条件编译写法|说明							|
|:-:	|:-:							|
|#ifdef APP-PLUS				|
|需条件编译的代码				|
|#endif							|
|仅出现在 App 平台下的代码		|
|#ifndef H5						|
|需条件编译的代码				|
|#endif							|
|除了 H5 平台，其它平台均存在的代码（注意if后面有个n）|
|#ifdef H5												|		| MP-WEIXIN						|
|需条件编译的代码				|
|#endif							|
|在 H5 平台或微信小程序平台存在的代码（这里只有			|		|，不可能出现&&，因为没有交集）	|

## 拨打电话
uni.makePhoneCall(OBJECT)

## button
open-type 有效值
contact打开客服会话，如果用户在会话中点击消息卡片后返回应用，可以从 @contact 回调中获得具体信息																						|:-:											|