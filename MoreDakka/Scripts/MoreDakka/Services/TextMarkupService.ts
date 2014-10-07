/// <reference path="../MoreDakka.ts"/>

module MoreDakka {
    export class TextMarkupService {
        markUp(text: string) {
            text = text
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/\r?\n/g, '<br />')
                .replace(/'''(.*?)'''/g, (m, l) => '<strong>' + l + '</strong>')
                .replace(/''(.*?)''/g, (m, l) => '<em>' + l + '</em>')
                .replace(/\[\[([A-Za-z0-9:\?\\\/&%\!@;#~\.\-\_]*)\]\]/g, (m, l: string) => {
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
            while (maxNest-- > 0 && text.match(/\{Quote(.*?)\}(.*?)\{\/Quote\}/)) {
                text = text.replace(/\{Quote(\|source=\"((?:[^\\"]+|\\.)*)\")?\}(((\{?!Quote\})|(?!\{\/?Quote).)+)\{\/Quote\}/g, (m, x1, source, l, a, b, c, d, e, f) => {
                    console.log(m, x1, source, l, a, b, c, d, e, f);
                    var sourceHtml = '';
                    if (source != undefined) {
                        sourceHtml = '<footer>' + source + '</footer>';
                    }
                    return '<blockquote><p>' + l + "</p>" + sourceHtml + '</blockquote>';
                });
            }
            return text;
        }
    }

    moreDakka.service('textMarkupService', TextMarkupService);
}