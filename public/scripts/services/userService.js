'use strict';

// would be removed later
app
    .factory('User', function($resource) {
        return $resource('/auth/local/user/:id/', null, {
            'update': {
                method: 'PUT'
            }
        });
    });