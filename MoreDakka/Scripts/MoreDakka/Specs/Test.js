/// <reference path="../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../Controllers/ForumController.ts" />
/// <reference path="../Services/ForumService.ts" />
describe("Forum Controller", function () {
    var scope;
    var httpBackend;
    var forumService;

    beforeEach(module('moreDakka'));

    beforeEach(inject(function ($rootScope, $controller, $httpBackend, $http) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;

        forumService = {
            getBoardsCallback: null,
            getBoards: function () {
                return {
                    then: function (fn) {
                    }
                };
            }
        };
        spyOn(forumService, "getBoards").and.callThrough();

        $controller("forumController", {
            $scope: scope,
            forumService: forumService
        });

        httpBackend.expectGET('Home/Home').respond('');
        httpBackend.flush();
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it("should get the current boards", function () {
        expect(forumService.getBoards).toHaveBeenCalled();
    });
});
