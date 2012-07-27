// jQuery Tipping Point v0.2
// Licensed under MIT. Copyright (c) 2012 Solita

(function ($, window, document, undefined) {

$.fn.tp = function (options_in) {

    var options = $.extend({
        offset: 5,                      // tooltip offset
        allowTitleChange: false         // Always read the "title" attribute, in-case it has changed
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
        // Don't show the tooltip if there is no text
        if (options.allowTitleChange && $.trim(text) === '') {
            return;
        }

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
            cachedTitle = $this.attr('title');

        // Don't hook functions, if there is no title and we don't want to read it automatically on update
        if (!options.allowTitleChange && $.trim(cachedTitle) === '') {
            return;
        }

        $this.hover(function () {
            var pos = $this.offset(),
                x = pos.left,
                y = pos.top;

            if (options.allowTitleChange) {
                var updatedTitle = $this.attr('title');
                if ($.trim(updatedTitle) !== '') {
                    cachedTitle = updatedTitle;
                    $this.attr('orig-title', cachedTitle);

                    // Remove the title, so it doesn't show up on hover
                    $this.removeAttr('title');
                }
            }

            showTooltip(x, y, cachedTitle);
        }, function () {
            hideTooltip();
        });

        $this.attr('orig-title', cachedTitle);

        // Remove the title, so it doesn't show up on hover
        $this.removeAttr('title');
    });
};


})(jQuery, window, document);
