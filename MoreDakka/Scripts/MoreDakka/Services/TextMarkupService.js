/// <reference path="../MoreDakka.ts"/>
var MoreDakka;
(function (MoreDakka) {
    var TextMarkupService = (function () {
        function TextMarkupService() {
        }
        TextMarkupService.prototype.markUp = function (text) {
            var text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\r?\n/g, '<br />').replace(/'''(.*?)'''/g, function (m, l) {
                return '<strong>' + l + '</strong>';
            }).replace(/''(.*?)''/g, function (m, l) {
                return '<em>' + l + '</em>';
            }).replace(/\[\[([A-Za-z0-9:\?\\\/&%\!@;#~\.\-\_]*)\]\]/g, function (m, l) {
                var p = l.split(/\|/);
                var link = p.shift();

                var matches = link.match(/^Image:(.*)/);
                if (matches) {
                    return "<img src=\"" + matches[1] + "\" />";
                } else {
                    return '<a href="' + link + '">' + (p.length ? p.join('|') : link) + '</a>';
                }
            });

            var maxNest = 3;
            while (maxNest-- > 0 && text.match(/\{\{Quote(.*?)\}\}/)) {
                console.log("loop: " + maxNest);
                text = text.replace(/\{\{Quote\|text=\"((?:[^\\"]+|\\.)*)\"(\|source=\"(.*?)\")?\}\}/g, function (m, l, _, source) {
                    var sourceHtml = '';
                    if (source != undefined) {
                        sourceHtml = '<footer>' + source + '</footer>';
                    }
                    return '<blockquote><p>' + l + "</p>" + sourceHtml + '</blockquote>';
                });
            }
            return text;
        };
        return TextMarkupService;
    })();
    MoreDakka.TextMarkupService = TextMarkupService;

    MoreDakka.moreDakka.service('textMarkupService', TextMarkupService);
})(MoreDakka || (MoreDakka = {}));
