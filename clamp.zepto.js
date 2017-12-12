;
(function($) {

    $.extend($.fn, {
        clamp: function(options) {
            var self = this;
            var opt = {
                // 溢出文本行数，默认2
                clamp: options.clamp || 2,
                // 使用支持的css属性实现
                useNativeClamp: typeof(options.useNativeClamp) != 'undefined' ? options.useNativeClamp : true,
                animate: options.animate || false,
                // 是否已经给包裹元素设置高度(避免截取后高度闪动),通过定高限制打点行数
                hasHeight: options.hasHeight || false,
                // TODO是否截取的是纯文本节点
                isPureTextNode: options.isPureTextNode || false,
                // 分割字符数组，在句号、连字符、短破折号、长破折号和空字符之间分割
                // Split on sentences (periods), hypens, en-dashes, em-dashes, and words (spaces).
                splitOnChars: options.splitOnChars || ['.', '-', '–', '—', ' '],
                // 省略字符，默认省略号
                truncationChar: options.truncationChar || '…',
                // 省略html片段
                truncationHTML: options.truncationHTML
            };


            /**
             * 返回指定元素的指定样式渲染后的值
             * @param  {Object} elem 指定元素
             * @param  {string} prop 指定属性
             * @return {string}      属性值
             */
            function computeStyle(elem, prop) {
                return window.getComputedStyle(elem, null).getPropertyValue(prop);
            }
            /**
             * 获取文本的行高
             */
            function getLineHeight(elem) {
                var lh = computeStyle(elem, 'line-height');
                if (lh === 'normal') {
                    // Normal line heights vary from browser to browser. The spec recommends
                    // a value between 1.0 and 1.2 of the font size. Using 1.1 to split the diff.
                    lh = parseInt(computeStyle(elem, 'font-size')) * 1.1;
                }
                return parseInt(lh);
            }
            /**
             * 根据设定的溢出行数获取最大高度
             * @param  {number} clmp 溢出行数
             * @return {number}      溢出最大高度
             */
            function getMaxHeight(clmp) {
                var lineHeight = getLineHeight(self[0]);
                return lineHeight * clmp;
            }

            // slice()方法将数组的一部分浅拷贝, 返回到从开始到结束（不包括结束）选择的新数组对象。原始数组不会被修改
            var splitOnChars = opt.splitOnChars.slice(0);
            var splitChar = splitOnChars[0];
            var chunks;
            var lastChunk;

            /**
             * 截断，每次从文本中移除一个字符直到它的宽度或高度到达约定的最大传入参数
             * @param  {Object} target    最后一个子元素
             * @param  {number} maxHeight 溢出文本限定最大高度
             * @return {string}           溢出省略处理后文本
             */
            function truncate(target, maxHeight) {
                if (!maxHeight) return;

                // 重置
                function reset() {
                    splitOnChars = opt.splitOnChars.slice(0);
                    splitChar = splitOnChars[0];
                    chunks = null;
                    lastChunk = null;
                }

                // 删除字符中的省略字符
                var nodeValue = target.nodeValue.replace(opt.truncationChar, '');

                // 捕获下一块,如果chunks为空
                if (!chunks) {
                    // If there are more characters to try, grab the next one
                    // 如果还有更多的字符去尝试，捕获下一个
                    if (splitOnChars.length > 0) {
                        // shift()方法从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度
                        splitChar = splitOnChars.shift();
                    }
                    else {
                        splitChar = '';
                    }
                    // split()方法将一个String对象分割成字符串数组，将字符串分成子串。
                    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split
                    // str.split([separator],[limit])
                    // 当找到一个 seperator 时，separator 会从字符串中被移除，返回存进一个数组当中的子字符串。
                    // 如果忽略 separator 参数，则返回的数组包含一个元素，该元素是原字符串。
                    // 如果 separator 是一个空字符串，则 str 将被转换为由字符串中字符组成的一个数组。
                    chunks = nodeValue.split(splitChar);
                }

                // If there are chunks left to remove, remove the last one and see if the nodeValue fits.
                if (chunks.length > 1) {
                    // pop()方法从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。
                    lastChunk = chunks.pop();
                    // join()方法用于把数组中的所有元素放入一个字符串。
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
                    if (opt.hasHeight ? self[0].scrollHeight <= maxHeight : self[0].clientHeight <= maxHeight) {
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
                } else {
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

            // 截取后文本
            var clampedText;

            var height = opt.hasHeight ? computeStyle(self[0], 'height') : getMaxHeight(opt.clamp);
            if (opt.hasHeight ? height < self[0].scrollHeight : height < self[0].clientHeight) {
                // 获取截断溢出省略文本
                clampedText = truncate(self[0], height);
            } else {
                clampedText = originalText;
                if (opt.hasHeight) {
                    element.style.height = "auto";
                }
            }


            return {
                'original': self.html(),
                'clamped': clampedText,
                'clampedPureText': clampedPureText
            }

        }
    });

})(Zepto);