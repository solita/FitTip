/*!
 * jQuery Tipping Point v0.1
 * Copyright 2012, Antti-Jussi Kovalainen
 * Licensed under MIT
 */

(function ($, window, document, undefined) {

$.fn.tp = function (options_in) {

    var options = $.extend({
        offset: 5      // tooltip offset
    }, options_in);

    var tooltip = $('<div id="tipping-point"><div class="tp-inner"></div><div class="tp-arrow"></div></div>');

    var tooltip_inner = tooltip.find('.tp-inner'),
        tooltip_arrow = tooltip.find('.tp-arrow');

    tooltip.css({
        display: 'block',
        position: 'absolute',
        visibility: 'hidden'
    });
    
    function showTooltip(x, y, text) {
        tooltip_inner.html(text);

        $('body').append(tooltip);

        var h = tooltip[0].offsetHeight;

        y = y - h - options.offset;

        tooltip.css({
            left: x,
            top: y,
            visibility: 'visible'
        });
    }

    function hideTooltip() {
        tooltip.remove();
    }

    return this.each(function () {
        var $this = $(this),
            title = $this.attr('title');

        if ($.trim(title) === '') {
            return;
        }

        $this.hover(function () {
            var pos = $this.offset(),
                x = pos.left,
                y = pos.top;

            showTooltip(x, y, title);
        }, function () {
            hideTooltip();
        });

        $this.attr('orig-title', title);
        $this.removeAttr('title');
    });
};


})(jQuery, window, document);
