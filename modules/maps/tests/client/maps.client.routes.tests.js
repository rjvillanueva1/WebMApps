(function () {
  'use strict';

  describe('maps Route Tests', function () {
    // Initialize global variables
    var $scope,
      mapsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _mapsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      mapsService = _mapsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('maps');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/maps');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('List Route', function () {
        var liststate;
        beforeEach(inject(function ($state) {
          liststate = $state.get('maps.list');
        }));

        it('Should have the correct URL', function () {
          expect(liststate.url).toEqual('');
        });

        it('Should not be abstract', function () {
          expect(liststate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(liststate.templateUrl).toBe('/modules/maps/client/views/list-maps.client.view.html');
        });
      });

      describe('View Route', function () {
        var viewstate,
          mapsController,
          mockArticle;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('maps.view');
          $templateCache.put('/modules/maps/client/views/view-article.client.view.html', '');

          // create mock article
          mockArticle = new mapsService({
            _id: '525a8422f6d0f87f0e407a33',
            title: 'An Article about MEAN',
            content: 'MEAN rocks!'
          });

          // Initialize Controller
          mapsController = $controller('mapsController as vm', {
            $scope: $scope,
            articleResolve: mockArticle
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:articleId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.articleResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            articleId: 1
          })).toEqual('/maps/1');
        }));

        it('should attach an article to the controller scope', function () {
          expect($scope.vm.article._id).toBe(mockArticle._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('/modules/maps/client/views/view-article.client.view.html');
        });
      });

      describe('Handle Trailing Slash', function () {
        beforeEach(inject(function ($state, $rootScope, $templateCache) {
          $templateCache.put('/modules/maps/client/views/list-maps.client.view.html', '');

          $state.go('maps.list');
          $rootScope.$digest();
        }));

        it('Should remove trailing slash', inject(function ($state, $location, $rootScope) {
          $location.path('maps/');
          $rootScope.$digest();

          expect($location.path()).toBe('/maps');
          expect($state.current.templateUrl).toBe('/modules/maps/client/views/list-maps.client.view.html');
        }));
      });
    });
  });
}());
