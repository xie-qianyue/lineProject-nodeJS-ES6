'use strict';

/**
 *  Route middleware to ensure user is authenticated.
 */
exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.sendStatus(401);
}

/**
 * Logout
 * returns nothing
 */
exports.logout = function(req, res) {
    if (req.isAuthenticated()) {
        req.logout();
        res.sendStatus(200);
    } else {
        res.status(401).send('You have not logged in.');
    }
};