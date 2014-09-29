/// <reference path="../MoreDakka.ts"/>
var MoreDakka;
(function (MoreDakka) {
    var TextMarkup = (function () {
        function TextMarkup() {
        }
        TextMarkup.prototype.markUp = function (text) {
            return text.replace(/'''(.*?)'''/g, function (m, l) {
                return '<strong>' + l + '</strong>';
            }).replace(/''(.*?)''/g, function (m, l) {
                return '<em>' + l + '</em>';
            });
        };
        return TextMarkup;
    })();
    MoreDakka.TextMarkup = TextMarkup;

    MoreDakka.moreDakka.service('textMarkup', TextMarkup);
})(MoreDakka || (MoreDakka = {}));
