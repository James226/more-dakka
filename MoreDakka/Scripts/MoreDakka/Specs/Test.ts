/// <reference path="../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../Controllers/ForumController.ts" />
/// <reference path="../Services/ForumService.ts" />

describe("Forum Controller", function () {
    var scope: any;
    var httpBackend: any;
    var forumService: any;
    
    beforeEach(module('moreDakka'));

    beforeEach(inject(function ($rootScope, $controller, $httpBackend, $http) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        
        forumService = {
            test: 'Mcked!',
            getBoards: function () {
                return {
                    then: function () { }
                }
            }
        };
        spyOn(forumService, "getBoards").andCallThrough();

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

    it("should be called", function () {
        expect(forumService.getBoards).toHaveBeenCalled();
    });
});