app.factory('lineService', ['$http', '$q', function($http, $q, $rootScope) {
    'use strict';

    // service interface
    var service = {
        addActivity: addActivity,
        getActivities: getActivities
    };

    function addActivity(newActivity) {

        var def = $q.defer();

        $http.post('/api/addActivity', newActivity)
            .then(function(res){
                def.resolve(res.data);
            },
            function(err){
                // TODO
                console.log('Error : ' + err);
                def.reject('Failed to add activity');
            });

        return def.promise;
    }

    function getActivities() {

    	var def = $q.defer();

    	$http.get('/api/getActivities')
    		.then(function(res){
    			def.resolve(res.data);
    		},
    		function(err){
    			// TODO
                console.log('Error : ' + err);
                def.reject('Failed to get activities');
    		});

    	return def.promise;
    }

    return service;

}]);