/**
 * 移动端截取
 * @param  {[type]} $ [description]
 * @return {[type]}   [description]
 */
;(function($) {

    $.extend($.fn, {
        clamp: function(options) {
            // 当前操作的zepto封装的dom对象
            var $self = this;
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
            };

            $.extend(opt, options);
            
            var original = $self.html();
            // 截取后未拼接truncationHTML的字符串
            var clampedPure;
            // 截取后已拼接truncationHTML的字符串
            var clampedHtml;
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
             * 获取指定元素渲染后的行高
             * @param  {Object} elem 指定元素
             * @return {number}      行高
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
                var lineHeight = getLineHeight($self[0]);
                return lineHeight * clmp;
            }

            // slice()方法将数组的一部分浅拷贝, 返回到从开始到结束（不包括结束）选择的新数组对象。原始数组不会被修改
            var splitOnChars = opt.splitOnChars.slice(0);
            var splitChar = splitOnChars[0];
            var chunks;
            var lastChunk;

            /**
             * 截断，每次从文本中移除一个字符直到它的宽度或高度到达约定的最大传入参数
             * @param  {Object} target    zepto元素
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

                // 目标字符串
                var targetString = target.html();

                // 捕获下一块，如果chunks为空
                if (!chunks) {
                    // 如果还有更多的字符去尝试，捕获下一个
                    if (splitOnChars.length > 0) {
                        // shift()方法从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度
                        splitChar = splitOnChars.shift();
                    }
                    else {
                        splitChar = '';
                    }
                    // split()方法将一个String对象分割成字符串数组，将字符串分成子串。
                    chunks = targetString.split(splitChar);
                }

                // If there are chunks left to remove, remove the last one and see if the nodeValue fits.
                // 如果有字符块需要移除，移除最后一个字符块，看拼接后的字符串是否匹配。
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
                if (opt.truncationHTML) {
                    $self.html( target.html() + opt.truncationHTML );
                }

                // 存在有效块
                if (chunks) {
                    // 包裹元素不定高时,添加html片段后的clientHeight不能高于maxHeight(特别是clamp为1的情况),否则死循环
                    if (opt.hasHeight ? $self[0].scrollHeight <= maxHeight : $self[0].clientHeight <= maxHeight) {

                        // There's still more characters to try splitting on, not quite done yet
                        // 仍旧有更多的字符要分割，还没有完全完成
                        if (splitOnChars.length >= 0 && splitChar != '') {
                            applyEllipsis(target, chunks.join(splitChar) + splitChar + lastChunk);
                            chunks = null;
                        }
                        // Finished!
                        else {
                            // 返回截断后过滤掉truncationHTML的字符串
                            clampedPure = $self.html().replace(opt.truncationHTML, '');
                            // 返回截断后已拼接truncationHTML的字符串
                            return $self.html();
                        }
                    }
                }
                else {
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
                return truncate(target, maxHeight);
            }

            /**
             * 拼接
             * @param  {Object} elem 指定元素
             * @param  {string} str  截断后字符文本
             * @return {string}      拼接后省略文本
             */
            function applyEllipsis(elem, str) {
                elem.html(str);
            }

            if(opt.force) {
               $self.append(opt.truncationHTML);
            }

            var height = opt.hasHeight ? parseFloat(computeStyle($self[0], 'height')) : getMaxHeight(opt.clamp);
            if (opt.hasHeight ? height < $self[0].scrollHeight : height < $self[0].clientHeight) {
                // 获取截断溢出省略文本
                clampedHtml = truncate($self, height);
                $self.data('clamp', true);
            } else {
                clampedHtml = $self.html();
                opt.force ? $self.data('clamp', true) : $self.data('clamp', false);
                if (opt.hasHeight) {
                    // 释放定高造成的多余空行
                    $self.css({'height':'auto'});
                }
            }

            return {
                'original': original,
                'clamped': clampedHtml,
                'clampedPure': clampedPure
            }

        }
    });

})(Zepto);