/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_clamp_zepto_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_clamp_zepto_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__src_clamp_zepto_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__demo_css__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__demo_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__demo_css__);


$(function() {

  /**
   * 包裹元素不定高
   */
  var $intro1 = $('#intro1');
  var clampResult1 = $intro1.clamp({
    clamp: 3,
    truncationHTML: '...<span class="triangle down"></span>'
  });

  /**
   * 包裹元素定高
   */
  var $intro2 = $('#intro2');
  var clampResult2 = $intro2.clamp({
    hasHeight: true,
    truncationHTML: '...<span class="triangle down"></span>'
  });

  /**
   * 标签有隐藏内容
   */
  var $tag3 = $('#tag3');
  var $intro3 = $('#intro3');
  var clampResult3 = $intro3.clamp({
    hasHeight: true,
    truncationHTML: '...<span class="triangle down"></span>'
  });

  if ($intro3.data('clamp')) {
    $intro3.on('click', function() {
      if ($(this).data('clamp')) {
        $intro3.html(clampResult3.original + '<span class="triangle up"></span>');
        $intro3.css({ 'height': 'auto' });
        $(this).data('clamp', false);
      } else {
        $intro3.html(clampResult3.clamped);
        $intro3.css({ 'height': '' });
        $(this).data('clamp', true);
      }
    });
  }

  /**
   * 标签有隐藏内容
   */
  var $tag4 = $('#tag4');
  var $intro4 = $('#intro4');
  var clampResult4 = $intro4.clamp({
    hasHeight: true,
    truncationHTML: '...<span class="triangle down"></span>',
    force: $tag4.get(0).scrollHeight > $tag4.get(0).clientHeight ? true : false
  });

  if ($intro4.data('clamp') || $tag4.get(0).scrollHeight > $tag4.get(0).clientHeight) {
    $intro4.on('click', function() {
      if ($(this).data('clamp')) {
        $intro4.html(clampResult4.original + '<span class="triangle up"></span>');
        $intro4.css({ 'height': 'auto' });
        $tag4.css({ 'height': 'auto' });
        $(this).data('clamp', false);
      } else {
        $intro4.html(clampResult4.clamped);
        $intro4.css({ 'height': '' });
        $tag4.css({ 'height': '' });
        $(this).data('clamp', true);
      }
    });
  }

  /**
   * 标签有隐藏内容
   */
  var $tag5 = $('#tag5');
  var $intro5 = $('#intro5');
  var clampResult5 = $intro5.clamp({
    hasHeight: true,
    truncationHTML: '...<span class="triangle down"></span>',
    force: $tag5.get(0).scrollHeight > $tag5.get(0).clientHeight ? true : false
  });
  if ($intro5.data('clamp') || $tag5.get(0).scrollHeight > $tag5.get(0).clientHeight) {
    $intro5.on('click', function() {
      if ($(this).data('clamp')) {
        $intro5.html(clampResult5.original + '<span class="triangle up"></span>');
        $intro5.css({ 'height': 'auto' });
        $tag5.css({ 'height': 'auto' });
        $(this).data('clamp', false);
      } else {
        $intro5.html(clampResult5.clamped);
        $intro5.css({ 'height': '' });
        $tag5.css({ 'height': '' });
        $(this).data('clamp', true);
      }
    });
  }

  /**
   * 对多个元素文本截取
   */
  var $intros = $('.intros');
  for (var i = 0; i < $intros.length; i++) {
    $intros.eq(i).clamp({
      hasHeight: true,
      truncationHTML: '...<span class="triangle down"></span>'
    });
  }

});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/* global Zepto:true */
/**
 * 移动端截取
 * @param  {[type]} $ [description]
 * @return {[type]}   [description]
 */
;
(function($) {
  $.extend($.fn, {
    clamp: function(options) {
      // 当前操作的zepto封装的dom对象
      var $self = this
      var opt = {
        // 溢出文本行数，默认2
        clamp: 2,
        // 是否已经给包裹元素设置高度(避免截取后高度闪动),通过定高限制打点行数
        hasHeight: false,
        // 分割字符数组，在句号、连字符、短破折号、长破折号和空字符之间分割
        // Split on sentences (periods), hypens, en-dashes, em-dashes, and words (spaces).
        splitOnChars: ['，', '、', '。', ' '],
        // 省略html片段
        truncationHTML: '',
        // 强制原文本追加省略html片段
        force: false
      }

      $.extend(opt, options)

      var original = $self.html()
      // 截取后未拼接truncationHTML的字符串
      var clampedPure
      // 截取后已拼接truncationHTML的字符串
      var clampedHtml
      /**
       * 返回指定元素的指定样式渲染后的值
       * @param  {Object} elem 指定元素
       * @param  {string} prop 指定属性
       * @return {string}      属性值
       */
      function computeStyle(elem, prop) {
        return window.getComputedStyle(elem, null).getPropertyValue(prop)
      }
      /**
       * 获取指定元素渲染后的行高
       * @param  {Object} elem 指定元素
       * @return {number}      行高
       */
      function getLineHeight(elem) {
        var lh = computeStyle(elem, 'line-height')
        if (lh === 'normal') {
          // Normal line heights vary from browser to browser. The spec recommends
          // a value between 1.0 and 1.2 of the font size. Using 1.1 to split the diff.
          lh = parseInt(computeStyle(elem, 'font-size')) * 1.1
        }
        return parseInt(lh)
      }
      /**
       * 根据设定的溢出行数获取最大高度
       * @param  {number} clmp 溢出行数
       * @return {number}      溢出最大高度
       */
      function getMaxHeight(clmp) {
        var lineHeight = getLineHeight($self[0])
        return lineHeight * clmp
      }

      // slice()方法将数组的一部分浅拷贝, 返回到从开始到结束（不包括结束）选择的新数组对象。原始数组不会被修改
      var splitOnChars = opt.splitOnChars.slice(0)
      var splitChar = splitOnChars[0]
      var chunks
      var lastChunk

      /**
       * 截断，每次从文本中移除一个字符直到它的宽度或高度到达约定的最大传入参数
       * @param  {Object} target    zepto元素
       * @param  {number} maxHeight 溢出文本限定最大高度
       * @return {string}           溢出省略处理后文本
       */
      function truncate(target, maxHeight) {
        if (!maxHeight) return

        // 重置
        // function reset() {
        //     splitOnChars = opt.splitOnChars.slice(0);
        //     splitChar = splitOnChars[0];
        //     chunks = null;
        //     lastChunk = null;
        // }

        // 目标字符串
        var targetString = target.html()

        // 捕获下一块，如果chunks为空
        if (!chunks) {
          // 如果还有更多的字符去尝试，捕获下一个
          if (splitOnChars.length > 0) {
            // shift()方法从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度
            splitChar = splitOnChars.shift()
          } else {
            splitChar = ''
          }
          // split()方法将一个String对象分割成字符串数组，将字符串分成子串。
          chunks = targetString.split(splitChar)
        }

        // If there are chunks left to remove, remove the last one and see if the nodeValue fits.
        // 如果有字符块需要移除，移除最后一个字符块，看拼接后的字符串是否匹配。
        if (chunks.length > 1) {
          // pop()方法从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。
          lastChunk = chunks.pop()
          // join()方法用于把数组中的所有元素放入一个字符串。
          applyEllipsis(target, chunks.join(splitChar))
        } else {
          // No more chunks can be removed using this character
          chunks = null
        }

        // Insert the custom HTML before the truncation character
        // 插入自定义的HTML片段在被截断的字符
        if (opt.truncationHTML) {
          $self.html(target.html() + opt.truncationHTML)
        }

        // 存在有效块
        if (chunks) {
          // 包裹元素不定高时,添加html片段后的clientHeight不能高于maxHeight(特别是clamp为1的情况),否则死循环
          if (opt.hasHeight ? $self[0].scrollHeight <= maxHeight : $self[0].clientHeight <= maxHeight) {
            // There's still more characters to try splitting on, not quite done yet
            // 仍旧有更多的字符要分割，还没有完全完成
            if (splitOnChars.length >= 0 && splitChar !== '') {
              applyEllipsis(target, chunks.join(splitChar) + splitChar + lastChunk)
              chunks = null
            } else {
              // 返回截断后过滤掉truncationHTML的字符串
              clampedPure = $self.html().replace(opt.truncationHTML, '')
              // 返回截断后已拼接truncationHTML的字符串
              return $self.html()
            }
          }
        } else {
          // No valid chunks even when splitting by letter, time to move on to the next node
          // 没有有效的块，甚至当分割空字母时，该移动到下一个节点
          // if (splitChar == '') {
          //     applyEllipsis(target, '');
          //     target = getLastChild(element);
          //     reset();
          // }
        }

        // If you get here it means still too big, let's keep truncating
        // 如果到这一步意味着字符串太大了，继续截断字符
        return truncate(target, maxHeight)
      }

      /**
       * 拼接
       * @param  {Object} elem 指定元素
       * @param  {string} str  截断后字符文本
       * @return {string}      拼接后省略文本
       */
      function applyEllipsis(elem, str) {
        elem.html(str)
      }

      if (opt.force) {
        $self.append(opt.truncationHTML)
      }

      var height = opt.hasHeight ? parseFloat(computeStyle($self[0], 'height')) : getMaxHeight(opt.clamp)
      if (opt.hasHeight ? height < $self[0].scrollHeight : height < $self[0].clientHeight) {
        // 获取截断溢出省略文本
        clampedHtml = truncate($self, height)
        $self.data('clamp', true)
      } else {
        clampedHtml = $self.html()
        opt.force ? $self.data('clamp', true) : $self.data('clamp', false)
        if (opt.hasHeight) {
          // 释放定高造成的多余空行
          $self.css({ 'height': 'auto' })
        }
      }

      return {
        'original': original,
        'clamped': clampedHtml,
        'clampedPure': clampedPure
      }
    }
  })
})(Zepto)

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(3);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./demo.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./demo.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, "* {\n    margin: 0;\n    padding: 0;\n}\n\n@media(min-width: 414px) {\n    body {\n        width: 366px;\n        margin: 0 auto;\n    }\n}\n\n@media(max-width: 414px) {\n    body {\n        margin: 0 auto;\n        padding: 24px;\n    }\n}\n\nsection {\n    font-size: 14px;\n    color: #000;\n    margin: 24px 0;\n}\n\np {\n    padding: 6px;\n}\n\n.ellipsis {\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n}\n\n.clamp {\n    text-overflow: ellipsis;\n    overflow: hidden;\n    display: -webkit-box;\n    -webkit-box-orient: vertical;\n}\n\n.clamp1 {\n    -webkit-line-clamp: 1;\n}\n\n.clamp2 {\n    -webkit-line-clamp: 2;\n}\n\n.tag {\n    display: inline-block;\n    padding: 0 8px;\n    height: 20px;\n    line-height: 21px;\n    font-size: 11px;\n    color: rgba(54, 58, 61, 0.35);\n    border: 1px solid;\n    position: relative;\n    border-radius: 4px;\n    vertical-align: bottom;\n    white-space: nowrap;\n    margin: 10px 8px 0 0;\n}\n\n.triangle {\n    display: inline-block;\n    position: relative;\n    float: right;\n    width: 8px;\n    height: 8px;\n}\n\n.triangle::before {\n    content: '';\n    position: absolute;\n    display: inline-block;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n    border: 4px solid;\n}\n\n.down {\n    margin: 10px 10px 0;\n}\n\n.up {\n    margin: 6px 10px 0;\n}\n\n.down::before {\n    border-color: #000 transparent transparent;\n    vertical-align: -0.25ex;\n}\n\n.up::before {\n    border-color: transparent transparent #000;\n    vertical-align: 0.25ex;\n}\n\n.tags {\n    overflow: hidden;\n    height: 32px;\n}\n\n\n\n\n\n\n\n/*\nOriginal highlight.js style (c) Ivan Sagalaev <maniac@softwaremaniacs.org>\n*/\n\n.hljs {\n    display: block;\n    overflow-x: auto;\n    padding: 0.5em;\n    background: #F0F0F0;\n}\n\n\n\n\n\n\n\n\n\n/* Base color: saturation 0; */\n\n.hljs,\n.hljs-subst {\n    color: #444;\n}\n\n.hljs-comment {\n    color: #888888;\n}\n\n.hljs-keyword,\n.hljs-attribute,\n.hljs-selector-tag,\n.hljs-meta-keyword,\n.hljs-doctag,\n.hljs-name {\n    font-weight: bold;\n}\n\n\n\n\n\n\n\n\n\n/* User color: hue: 0 */\n\n.hljs-type,\n.hljs-string,\n.hljs-number,\n.hljs-selector-id,\n.hljs-selector-class,\n.hljs-quote,\n.hljs-template-tag,\n.hljs-deletion {\n    color: #880000;\n}\n\n.hljs-title,\n.hljs-section {\n    color: #880000;\n    font-weight: bold;\n}\n\n.hljs-regexp,\n.hljs-symbol,\n.hljs-variable,\n.hljs-template-variable,\n.hljs-link,\n.hljs-selector-attr,\n.hljs-selector-pseudo {\n    color: #BC6060;\n}\n\n\n\n\n\n\n\n\n\n/* Language color: hue: 90; */\n\n.hljs-literal {\n    color: #78A960;\n}\n\n.hljs-built_in,\n.hljs-bullet,\n.hljs-code,\n.hljs-addition {\n    color: #397300;\n}\n\n\n\n\n\n\n\n\n\n/* Meta color: hue: 200 */\n\n.hljs-meta {\n    color: #1f7199;\n}\n\n.hljs-meta-string {\n    color: #4d99bf;\n}\n\n\n\n\n\n\n\n\n\n/* Misc effects */\n\n.hljs-emphasis {\n    font-style: italic;\n}\n\n.hljs-strong {\n    font-weight: bold;\n}", ""]);

// exports


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(6);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);