///// <reference path="../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../Controllers/Forum/ForumController.ts" />
/// <reference path="../Services/TextMarkupService.ts" />
describe("Text Markup Service", function () {
    var textMarkup;

    beforeEach(function () {
        textMarkup = new MoreDakka.TextMarkupService();
    });

    it("should return unformatted text", function () {
        expect(textMarkup.markUp("Some Text.")).toEqual("Some Text.");
    });

    it("should strip HTML markup", function () {
        expect(textMarkup.markUp("This is a <strong>test&</strong>.")).toEqual("This is a &lt;strong&gt;test&amp;&lt;/strong&gt;.");
    });

    it("should replace new lines with line breaks", function () {
        expect(textMarkup.markUp("This should have a\nnew line.")).toEqual("This should have a<br />new line.");
    });

    it("should replace strong markup", function () {
        expect(textMarkup.markUp("This is a '''test'''.")).toEqual("This is a <strong>test</strong>.");
    });

    it("should replace italics", function () {
        expect(textMarkup.markUp("This is a ''test''.")).toEqual("This is a <em>test</em>.");
    });

    it("should replace image tags", function () {
        expect(textMarkup.markUp("This is a [[Image:http://domain.com/myimage.jpg]]. ")).toEqual("This is a <img src=\"http://domain.com/myimage.jpg\" />. ");
    });

    it("should replace basic quotes", function () {
        expect(textMarkup.markUp(("This contains {Quote}a quote{/Quote}"))).toEqual("This contains <blockquote><p>a quote</p></blockquote>");
    });

    it("should replace multiline quotes", function () {
        expect(textMarkup.markUp(("This contains {Quote}a\r\nquote{/Quote}"))).toEqual("This contains <blockquote><p>a<br />quote</p></blockquote>");
    });

    it("should replace source quotes", function () {
        expect(textMarkup.markUp(("This contains {Quote|source=\"some cool author\"}a quote{/Quote}"))).toEqual("This contains <blockquote><p>a quote</p><footer>some cool author</footer></blockquote>");
    });

    it("should replace nested quotes", function () {
        expect(textMarkup.markUp(("This contains {Quote|source=\"some cool author\"}a quote{Quote}within a quote{/Quote}{/Quote}"))).toEqual("This contains <blockquote><p>a quote<blockquote><p>within a quote</p></blockquote></p><footer>some cool author</footer></blockquote>");
    });

    it("should replace a maximum of 3 nested quotes", function () {
        expect(textMarkup.markUp(("This contains {Quote|source=\"some cool author\"}a quote{Quote}within a{Quote}within a{Quote}within a quote{/Quote}quote{/Quote}quote{/Quote}{/Quote}"))).toEqual("This contains {Quote|source=\"some cool author\"}a quote<blockquote><p>within a<blockquote><p>within a<blockquote><p>within a quote</p></blockquote>quote</p></blockquote>quote</p></blockquote>{/Quote}");
    });

    it("should replace non-nested quotes", function () {
        expect(textMarkup.markUp(("This contains {Quote|source=\"some cool author\"}a quote{/Quote}\n\n{Quote|source=\"some cool author\"}a quote{/Quote}"))).toEqual("This contains <blockquote><p>a quote</p><footer>some cool author</footer></blockquote><br /><br /><blockquote><p>a quote</p><footer>some cool author</footer></blockquote>");
    });
});
//# sourceMappingURL=TextMarkupTests.js.map
