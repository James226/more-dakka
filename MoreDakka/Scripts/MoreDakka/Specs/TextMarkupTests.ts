/// <reference path="../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../Controllers/Forum/ForumController.ts" />
/// <reference path="../Services/TextMarkupService.ts" />

describe("Text Markup Service", function () {
    var textMarkup: MoreDakka.TextMarkupService;

    beforeEach(() => {
        textMarkup = new MoreDakka.TextMarkupService();
    });

    it("should return unformatted text", () => {
        expect(textMarkup.markUp("Some Text.")).toEqual("Some Text.");
    });

    it("should strip HTML markup", () => {
        expect(textMarkup.markUp("This is a <strong>test&</strong>.")).toEqual("This is a &lt;strong&gt;test&amp;&lt;/strong&gt;.");
    });

    it("should replace new lines with line breaks", () => {
        expect(textMarkup.markUp("This should have a\nnew line.")).toEqual("This should have a<br />new line.");
    });

    it("should replace strong markup", () => {
        expect(textMarkup.markUp("This is a '''test'''.")).toEqual("This is a <strong>test</strong>.");
    });

    it("should replace italics", () => {
        expect(textMarkup.markUp("This is a ''test''.")).toEqual("This is a <em>test</em>.");
    });

    it("should replace image tags", () => {
        expect(textMarkup.markUp("This is a [[Image:http://domain.com/myimage.jpg]]. ")).toEqual("This is a <img src=\"http://domain.com/myimage.jpg\" />. ");
    });
});