/**
 * Released under the WTFPL license (http://www.wtfpl.net/about/)
 * https://github.com/josephschmitt/Clamp.js
 * Clamps an HTML element by adding ellipsis to it if the content inside is too long. http://joe.sh/clamp-js
 */

(function(){
    /**
     * Clamps a text node.
     * @param {HTMLElement} element. Element containing the text node to clamp.
     * @param {Object} options. Options to pass to the clamper.
     */
    function clamp(element, options) {
        options = options || {};

        var self = this;
        var win = window;
        var opt = {
                // 溢出文本行数，默认2
                clamp:              options.clamp || 2,
                // 使用支持的css属性实现
                useNativeClamp:     typeof(options.useNativeClamp) != 'undefined' ? options.useNativeClamp : true,
                // Split on sentences (periods), hypens, en-dashes, em-dashes, and words (spaces).
                // 在句号、连字符、短破折号、长破折号和字符空之间分割
                animate:            options.animate || false,
                // 是否已经定高(避免截取内容高度闪东),通过定高限制打点行数
                hasHeight:          options.hasHeight || false,
                // TODO是否截取的是纯文本节点
                isPureTextNode:     options.isPureTextNode || false,
                // 分割字符数组
                splitOnChars:       options.splitOnChars || ['.', '-', '–', '—', ' '], 
                // 省略字符，默认省略号
                truncationChar:     options.truncationChar || '…',
                // 省略html片段
                truncationHTML:     options.truncationHTML
            };

        var sty = element.style;
        // 原始文本
        var originalText = element.innerHTML;
        // 截断后的纯文本
        var clampedPureText = '';
        // 是否支持CSS溢出属性
        var supportsNativeClamp = typeof(element.style.webkitLineClamp) != 'undefined';
        // 溢出文本行数
        var clampValue = opt.clamp;
        // 是否css值，溢出文本给定高度
        var isCSSValue = clampValue.indexOf && (clampValue.indexOf('px') > -1 
            || clampValue.indexOf('em') > -1 || clampValue.indexOf('rem') > -1);
        var truncationHTMLContainer;
            
        if (opt.truncationHTML) {
            truncationHTMLContainer = document.createElement('span');
            truncationHTMLContainer.innerHTML = opt.truncationHTML;
        }


        /**
         * Return the current style for an element.
         * @param {HTMLElement} elem The element to compute.
         * @param {string} prop The style property.
         * @returns {number}
         */
        /**
         * 返回指定元素的指定样式属性的值
         * @param  {Object} elem 指定元素
         * @param  {string} prop 指定属性
         * @return {string}      属性值
         */
        function computeStyle(elem, prop) {
            if (!win.getComputedStyle) {

                win.getComputedStyle = function(el, pseudo) {
                    this.el = el;
                    this.getPropertyValue = function(prop) {
                        var re = /(\-([a-z]){1})/g;
                        if (prop == 'float') prop = 'styleFloat';
                        if (re.test(prop)) {
                            prop = prop.replace(re, function () {
                                return arguments[2].toUpperCase();
                            });
                        }
                        // IE:currentStyle 
                        return el.currentStyle && el.currentStyle[prop] ? el.currentStyle[prop] : null;
                    }
                    return this;
                }
            }

            return win.getComputedStyle(elem, null).getPropertyValue(prop);
        }

        /**
         * Returns the maximum number of lines of text that should be rendered based
         * on the current height of the element and the line-height of the text.
         */
        /**
         * 获取初始包裹元素内文本的最大行数
         * @param  {int} height 溢出文本包裹给定高度
         * @return {int}        最大行数
         */
        function getMaxLines(height) {
            // avaiHeight可用高度
            var availHeight = height || opt.hasHeight ? element.scrollHeight : element.clientHeight;
            var lineHeight = getLineHeight(element);

            // Math.floor()方法对一个数进行向下取整
            // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
            // Math.max() 函数返回一组数中的最大值
            // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/max
            return Math.max(Math.floor(availHeight/lineHeight), 0);
        }

        /**
         * Returns the maximum height a given element should have based on the line-
         * height of the text and the given clamp value.
         */
        /**
         * 根据设定的溢出行数获取最大高度
         * @param  {number} clmp 溢出行数
         * @return {number}      溢出最大高度
         */
        function getMaxHeight(clmp) {
            var lineHeight = getLineHeight(element);
            return lineHeight * clmp;
        }

        /**
         * Returns the line-height of an element as an integer.
         */
        /**
         * 返回指定元素设置的行高属性的整数型值
         * @param  {Object} elem 指定元素
         * @return {number}      文本行的高度
         */
        function getLineHeight(elem) {
            var lh = computeStyle(elem, 'line-height');
            if (lh == 'normal') {
                // Normal line heights vary from browser to browser. The spec recommends
                // a value between 1.0 and 1.2 of the font size. Using 1.1 to split the diff.
                lh = parseInt(computeStyle(elem, 'font-size')) * 1.2;
            }
            return parseInt(lh);
        }


        // MEAT AND POTATOES 最基本的部分
        // slice()方法将数组的一部分浅拷贝, 返回到从开始到结束（不包括结束）选择的新数组对象。原始数组不会被修改
        // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
        var splitOnChars = opt.splitOnChars.slice(0);
        // 指定分割字符
        var splitChar = splitOnChars[0];
        // 字符块数组
        var chunks;
        // 最后的字符块
        var lastChunk;
        
        /**
         * Gets an element's last child. That may be another node or a node's contents.
         */
        /**
         * 获取最后一个子元素，可能是另一个节点或者是节点的内容
         * @param  {Object} elem 指定元素
         * @return {Object}      最后一个子元素
         */
        function getLastChild(elem) {
            // Current element has children, need to go deeper and get last child as a text node
            // Node.lastChild是一个只读属性，返回当前节点的最后一个子节点。
            // 如果父节点为一个元素节点，则子节点通常为一个元素节点，或一个文本节点，或一个注释节点。如果没有子节点，则返回 null。
            // https://developer.mozilla.org/zh-CN/docs/Web/API/Node/lastChild
            // ParentNode.children 是一个只读属性，返回一个包含当前元素的子元素的集合，该集合为一个即时更新的（live）HTMLCollection。
            // https://developer.mozilla.org/zh-CN/docs/Web/API/ParentNode/children
            if (elem.lastChild.children && elem.lastChild.children.length > 0) {
                // pop()方法从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。
                // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/pop
                return getLastChild(Array.prototype.slice.call(elem.children).pop());
            }
            // This is the absolute last child, a text node, but something's wrong with it. Remove it and keep trying
            // 这个是绝对的最后一个子元素，文本节点，但是有一些错误，删除它然后继续尝试
            // node.nodeValue获取或设置当前节点的值
            // https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeValue
            else if (
                    !elem.lastChild
                    || !elem.lastChild.nodeValue
                    || elem.lastChild.nodeValue == ''
                    || elem.lastChild.nodeValue == opt.truncationChar
                ) {
                    // removeChild()方法可从子节点列表中删除某个节点。如删除成功，此方法可返回被删除的节点，如失败，则返回null。
                    // https://developer.mozilla.org/zh-CN/docs/Web/API/Node/removeChild
                    elem.lastChild.parentNode.removeChild(elem.lastChild);
                    return getLastChild(element);
                }
            // This is the last child we want, return it
            // 我们想要的最后一个子元素，返回它
            else {
                return elem.lastChild;
            }
        }
        
        /**
         * Removes one character at a time from the text until its width or
         * height is beneath the passed-in max param.
         */
        /**
         * 截断，每次从文本中移除一个字符直到它的宽度或高度到达约定的最大传入参数
         * @param  {Object} target    最后一个子元素
         * @param  {number} maxHeight 溢出文本限定最大高度
         * @return {string}           溢出省略处理后文本
         */
        function truncate(target, maxHeight) {
            if (!maxHeight) {return;}
            
            /**
             * Resets global variables.
             */
            //重置全局变量
            function reset() {
                splitOnChars = opt.splitOnChars.slice(0);
                splitChar = splitOnChars[0];
                chunks = null;
                lastChunk = null;
            }

            // replace()方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
            // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace
            // node.nodeValue获取或设置当前节点的值
            // https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeValue
            // 删除字符中的省略字符
            var nodeValue = target.nodeValue.replace(opt.truncationChar, '');
            
            // Grab the next chunks 捕获下一块
            // 如果chunks为空
            if (!chunks) {
                // If there are more characters to try, grab the next one
                // 如果还有更多的字符去尝试，捕获下一个
                if (splitOnChars.length > 0) {
                    // shift()方法从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度
                    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/shift
                    splitChar = splitOnChars.shift();
                }
                // No characters to chunk by. Go character-by-character
                else {
                    splitChar = '';
                }
                // split()方法将一个String对象分割成字符串数组，通过将字符串分成子串。
                // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split
                // str.split([separator],[limit])
                // 当找到一个 seperator 时，separator 会从字符串中被移除，返回存进一个数组当中的子字符串。
                // 如果忽略 separator 参数，则返回的数组包含一个元素，该元素是原字符串。
                // 如果 separator 是一个空字符串，则 str 将被转换为由字符串中字符组成的一个数组。
                chunks = nodeValue.split(splitChar);
            }
            
            // If there are chunks left to remove, remove the last one and see if the nodeValue fits.
            if (chunks.length > 1) {
                // console.log('chunks', chunks);
                // pop()方法从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。
                // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/pop
                lastChunk = chunks.pop();
                // console.log('lastChunk', lastChunk);
                // join()方法用于把数组中的所有元素放入一个字符串。
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join
                applyEllipsis(target, chunks.join(splitChar));
            }
            // No more chunks can be removed using this character
            else {
                chunks = null;
            }
            
            // Insert the custom HTML before the truncation character
            // 插入自定义的HTML片段在被截断的字符
            if (truncationHTMLContainer) {
                target.nodeValue = target.nodeValue.replace(opt.truncationChar, '');
                element.innerHTML = target.nodeValue + ' ' + truncationHTMLContainer.innerHTML;
            }

            // Search produced valid chunks 搜索产生的有效块
            if (chunks) {
                // It fits
                // 元素高度小于等于溢出文本限定最大高度，意味着截断结束
                // 注意添加截断html片段后的clientHeight不会高于maxHeight(特别是clamp为1的情况),否则死循环
                if (opt.hasHeight ? element.scrollHeight <= maxHeight : element.clientHeight <= maxHeight) {
                    // There's still more characters to try splitting on, not quite done yet
                    // 仍旧有更多的字符要分割，还没有完全完成
                    if (splitOnChars.length >= 0 && splitChar != '') {
                        applyEllipsis(target, chunks.join(splitChar) + splitChar + lastChunk);
                        chunks = null;
                    }
                    // Finished!
                    else {
                        // 返回之前获取截断后的纯文本
                        clampedPureText = target.nodeValue;
                        // console.log(clampedPureText);
                        return element.innerHTML;
                    }
                }
            }
            // No valid chunks produced
            // 没有有效字符块产生
            else {
                // No valid chunks even when splitting by letter, time to move on to the next node
                // 没有有效的块，甚至当分割字母时，该移动到下一个节点
                if (splitChar == '') {
                    applyEllipsis(target, '');
                    target = getLastChild(element);
                    reset();
                }
            }
            
            // If you get here it means still too big, let's keep truncating
            // 如果到这一步意味着字符串太大了，让我们继续截断字符
            if (opt.animate) {
                // 延迟继续阶段性字符
                setTimeout(function() {
                    truncate(target, maxHeight);
                }, opt.animate === true ? 10 : opt.animate);
            }
            else {
                // 继续截断字符
                return truncate(target, maxHeight);
            }
        }

        /**
         * 获取拼接后省略文本
         * @param  {Object} elem 指定元素
         * @param  {string} str  截断后字符文本
         * @return {string}      拼接后省略文本
         */
        function applyEllipsis(elem, str) {
            elem.nodeValue = str + opt.truncationChar;
        }

        // 根据包裹元素高度自动折行
        if (clampValue == 'auto') {
            clampValue = getMaxLines();
        }
        else if (isCSSValue) {
            clampValue = getMaxLines(parseInt(clampValue));
        }
        // 溢出文本
        var clampedText;
        if (supportsNativeClamp && opt.useNativeClamp && !opt.hasHeight) {
            sty.overflow = 'hidden';
            sty.textOverflow = 'ellipsis';
            sty.webkitBoxOrient = 'vertical';
            sty.display = '-webkit-box';
            sty.webkitLineClamp = clampValue;

            if (isCSSValue) {
                sty.height = opt.clamp + 'px';
            }
        }
        else {
            var height = opt.hasHeight ? parseFloat(computeStyle(element, 'height')) : getMaxHeight(clampValue);
            if (opt.hasHeight ? height < element.scrollHeight : height < element.clientHeight) {
                // 获取截断溢出省略文本
                clampedText = truncate(getLastChild(element), height);
            }
            else {
                clampedText = originalText;
                if(opt.hasHeight) {
                    element.style.height = "auto";
                }
            }
        }
        
        return {
            'original': originalText,
            'clamped': clampedText,
            'clampedPureText': clampedPureText
        }
    }

    window.$clamp = clamp;
})();
