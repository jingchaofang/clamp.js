/**
 * 指定行数截取所需文字，可以有换行标签
 * @return {Array} 截取到两部分html
 */
function splitHtml(options) {
    var opt = {
        // 截取html容器，原生DOM
        o: null,
        // 指定宽
        W: window.innerWidth,
        // 空余空间，用于放自定义样式
        spaceW: 30,
        // 需截取行数
        limitRowNum: 3,
        // 强制行尾的中文标点符号不换行，行首的中文标点不借字
        isHyphenation: false
    }

    $.extend(opt, options);
    if (opt.o == null) return;

    // 节点数组
    var chars = opt.o.childNodes;
    // 节点字号, 不取整
    var fSize = +window.getComputedStyle(opt.o, null).fontSize.replace(/px/, '');
    // 获取系统设置字体的缩放倍数，约定body原始大小14px，iPad为15px
    var _fScale = window.getComputedStyle(document.body, null).fontSize.replace(/px/, '') / 14;
    // 极端情况下权重倍增，比如华为mate8，每行富余接近一个汉字宽
    var weight = opt.W % fSize > .75 * fSize ? 2 : 1;
    // 累加文本宽
    var _w = 0;
    // 所需的html
    var needStr = '';
    // 截取html数组
    var _a = [];

    // html宽度相关函数
    // 因为非等宽字体，通过直串计算文本节点宽
    // 系统设置字体的，即使动态插入的也会被缩放影响
    function charsWidthSum(s, fs) {
        var _div = document.createElement('div');
        var _w = 0;
        _div.style.cssText = 'font-size:' + fs + 'px; visibility:hidden; white-space:nowrap; position:fixed; top:0; left:0';
        _div.innerHTML = s;
        document.body.appendChild(_div);
        _w = _div.offsetWidth;
        document.body.removeChild(_div);
        return _w
    }

    // 截取指定宽度
    function charsTrim(s, w, fs) {
        if (charsWidthSum(s, fs) > w) {
            while (charsWidthSum(s, fs) > w) {
                s = s.slice(0, -1)
            }
        }
        return s
    }

    // 遍历节点，统计宽，直到所需宽度
    for (var i = 0; i < chars.length; i++) {
        // br节点
        if (/br/i.test(chars[i].nodeName)) {
            // 连续br算新行，否则填满当前行
            if (i > 0 && /br/i.test(chars[i - 1].nodeName)) {
                _w += opt.W
            } else {
                _w = Math.ceil(_w / opt.W) * opt.W
            }

            needStr += '<br>';
            if (_w >= opt.W * opt.limitRowNum - opt.spaceW - fSize) {
                break
            }
        } else {
            var _nodeValue = chars[i].nodeValue;
            // 去除html格式化带来的空白符
            if (i == 0) {
                _nodeValue = _nodeValue.replace(/^\s+/, '')
            }
            var _curW = charsWidthSum(_nodeValue, fSize / _fScale);
            // 在指定行数减去箭头占位宽内，多减去一个字宽
            if (_w + _curW > opt.W * opt.limitRowNum - opt.spaceW - fSize) {
                // 介于一个节点间，对当前节点截取
                needStr += charsTrim(_nodeValue, opt.W * opt.limitRowNum - opt.spaceW - fSize * weight - _w, fSize / _fScale);
                break
            } else {
                _w += _curW;
                needStr += _nodeValue
            }

        }

    }

    var newNeedStr = needStr;
    if (!opt.isHyphenation) {
        newNeedStr = needStr.replace(/(”|“|，|。|；|！|、|……|：|〉|》|」|』|】|〕|〗|｝|］|）|〈|《|「|『|【|〔|〖|﹙|﹛|﹝|＄|（|［|｛|￡|￥|\u3000)/gi, '<span style="display:inline-block">$1</span>');
    }
    _a.push(newNeedStr);
    _a.push(opt.o.innerHTML.replace(/^\s+/, '').replace(new RegExp(needStr.replace(/(\[|\]|\{|\}|\\|\^|\$|\||\(|\)|\?|\*|\+|\.)/gi, '\\$1'), 'i'), ''));
    return _a

}
