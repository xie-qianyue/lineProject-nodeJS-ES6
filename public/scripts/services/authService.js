'use strict';

app
    .factory('Auth', function Auth($location, $rootScope, User, $http, $cookies) {

        $rootScope.currentUser = null;

        return {
            login: function(user) {
                $http.post('/auth/local/login', user).then(
                    function(res) {
                        $rootScope.message = 'Authentication successful!';
                        $cookies.put('currentUser', res.data.userEmail);
                        $rootScope.currentUser = res.data.userEmail;
                        $location.url('/');
                    },
                    function(error) {
                        $rootScope.message = error.data;
                        $location.url('/login');
                    });
            },

            logout: function() {
                $http.post('/auth/logout').then(
                    function() {
                        $rootScope.message = 'Logout successful!';
                        $cookies.remove('currentUser');
                        $rootScope.currentUser = null;
                    },
                    function(error) {
                        // TODO
                    });
            },

            createUser: function(user) {
                 $http.post('/auth/local/user', user).then(
                    function(res) {
                        $cookies.put('currentUser', res.data.userEmail);
                        $rootScope.currentUser = res.data.userEmail;
                        $location.url('/');
                    },
                    function(error) {
                        $rootScope.message = error.data;
                        $location.url('/signup');
                    });
            },

            checkLoggedin: function() {
                $http.get('/auth/loggedin').then(
                    function(loggedin) {
                        if (loggedin) {
                            // if logged in, save currentUser
                            $rootScope.currentUser = $cookies.get('currentUser');
                        } else {
                            $rootScope.currentUser = null;
                        }
                    },
                    function(error) {
                        // TODO
                        console.log(error);
                    });
            },
            // not supported yet
            changePassword: function(email, oldPassword, newPassword, callback) {
                var cb = callback || angular.noop;
                User.update({
                    email: email,
                    oldPassword: oldPassword,
                    newPassword: newPassword
                }, function(user) {
                    console.log('password changed');
                    return cb();
                }, function(err) {
                    return cb(err.data);
                });
            },
            // not supported yet
            removeUser: function(email, password, callback) {
                var cb = callback || angular.noop;
                User.delete({
                    email: email,
                    password: password
                }, function(user) {
                    console.log(user + 'removed');
                    return cb();
                }, function(err) {
                    return cb(err.data);
                });
            }
        };
    })