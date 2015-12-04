var app = angular.module('lineApp', [
    'ngRoute',
    'ngCookies',
    'ngResource'
]);

app
    .config(function($routeProvider, $locationProvider, $httpProvider) {
        'use strict';

        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
                templateUrl: '/views/main.html',
                controllerAs: 'lineCtrl',
                controller: 'lineController'
            })
            .when('/about', {
                templateUrl: '/views/about.html'
            })
            /*
            .when('/localTodo', {
                templateUrl: '/views/todo.html',            
                controllerAs: 'todoCtrl',
                controller: 'todoController'
            })*/
            .when('/login', {
                templateUrl: '/views/login.html',
                controller: 'loginCtrl'
            })
            .when('/signup', {
                templateUrl: '/views/signup.html',
                controller: 'signupCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

        // interceptor for 401 error
        $httpProvider.interceptors.push(function($q, $location) {
            return {
                response: function(response) {
                    // do something on success
                    return response;
                },
                responseError: function(response) {
                    if (response.status === 401) {
                        $location.url('/login');
                    }
                    return $q.reject(response);
                }
            };
        });

    })
    .run(function($rootScope, $location, Auth) {
        $rootScope.message = '';

        //watching currentUser
        $rootScope.$watch('currentUser', function(currentUser) {
            // if no currentUser and you try to update a page which needs authentication
            // we will check whether you have logged in
            if (!currentUser && (['/login', '/logout', '/signup'].indexOf($location.path()) == -1)) {
                Auth.checkLoggedin();
            }
        });

        // Logout function is available in any pages
        $rootScope.logout = function() {
            $rootScope.message = 'Logged out.';
            Auth.logout();
        };
    });