'use strict';

app.controller('signupCtrl', function($scope, Auth, $rootScope) {

    $rootScope.message = "";

    $scope.register = function() {
        Auth.createUser({
            email: $scope.user.email,
            username: $scope.user.username,
            password: $scope.user.password
        });
    };
});