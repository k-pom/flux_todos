"use strict";

var _ = require('underscore');

var BaseCommand = require('./base.js');

//
// Database Cache and 
//

var database = null;
var DB_NAME = "flux_todos";
var VERSION = 5;

var onUpgradeNeeded = function (event) {
    var db = event.target.result;
    
    db.deleteObjectStore("todos");
    var objectStore = db.createObjectStore("todos", {keyPath: "id",  autoIncrement: true});
    objectStore.createIndex("completed", "completed", {unique: false});
};

/**
 * Command to get a reference to the indexedDB instance.
 *
 * This command will cache a refrence to the database, which subsequent calls
 * to execute will return.
 * 
 * @constructor
 */

function DatabaseCommand() {
    // only one of this command should be active at a time.
    this.locked = true;
};

DatabaseCommand.prototype = _.extend({}, BaseCommand.prototype, {
    
    /**
     * Get a reference to the indexedDB.
     *
     * @public
     * @param {Function} callback - called with the results of the command.
     * signature: function (err, results)
     */

    run: function(err, data, callback) {
        if (database !== null) {
            callback(null, database);
            return;
        };
        
        var request = window.indexedDB.open(DB_NAME, VERSION);
        request.onupgradeneeded = onUpgradeNeeded;
        
        request.onsuccess = function (event) {
            database = request.result;
            callback(null, database);
        };
        
        request.onerror = function (event) {
            callback(event, null);
        };
    }
});

DatabaseCommand.prototype.constructor = DatabaseCommand;
module.exports = DatabaseCommand;
