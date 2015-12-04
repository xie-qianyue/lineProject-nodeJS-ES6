'use strict';

// Implicit Annotation
// Careful: If you plan to minify your code, your service names will get renamed and break your app.
app.controller('lineController', function($scope, $filter, lineService, $rootScope) {

    var line = this;

    line.today = moment().format();
    
    line.activities = []; 
    
    lineService.getActivities()
        .then(function(data){
            if(data.length != 0){
                line.activities.push(data);    
            }            
        },
        function(err){
            console.log('Error : ' + err);
        });
    
    // for test
    line.activities.push({
        name: 'reading',
        object: 'Hamlet'
    }, {
        name: 'jogging'
    });

    line.addActivity = function() {
        var newActivity = {
            name: line.activityName,
            userEmail: $rootScope.currentUser
        }

        if (line.objectName != null) {
            newActivity['object'] = line.objectName;
        }

        lineService.addActivity(newActivity)
            .then(function(data) {
                var activityAdded = {
                    name : data.name
                };
                line.activities.push(activityAdded);                
            },
            function(err) {
                // TODO
                console.log('Error : ' + err);
            });
    }
});