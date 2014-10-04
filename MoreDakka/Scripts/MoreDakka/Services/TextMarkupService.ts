/// <reference path="../MoreDakka.ts"/>

module MoreDakka {
    export class TextMarkupService {
        markUp(text: string) {
            return text
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/\n/g, '<br />')
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
        }
    }

    moreDakka.service('textMarkupService', TextMarkupService);
}