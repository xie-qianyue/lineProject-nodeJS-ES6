'use strict';

app.controller('loginCtrl', function($scope, Auth, $rootScope) {

    $rootScope.message = "";

    $scope.login = function() {
        // without provider
        Auth.login({
            'email': $scope.user.email,
            'password': $scope.user.password
        });
    };
});