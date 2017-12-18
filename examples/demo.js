import '../src/clamp.zepto.js';
import './demo.css';
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