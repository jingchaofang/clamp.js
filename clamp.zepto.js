;
(function($) {

    $.extend($.fn, {
        clamp: function(options) {
            var self = this, win = window;
            var opt = {
                // 溢出文本行数，默认2
                clamp: options.clamp || 2,
                // 使用支持的css属性实现
                useNativeClamp: typeof(options.useNativeClamp) != 'undefined' ? options.useNativeClamp : true, 
                animate: options.animate || false,
                // 是否已经定高(避免截取内容高度闪东),通过定高限制打点行数
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

            return {
                originalText: self.html() + ''
            }
        }
    });

})(Zepto);