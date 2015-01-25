'use strict';

var _ = require('underscore');

var BaseCommand = require('./base.js');
var DatabaseCommand = require('./database.js');

var collection = require("../collections/todos.js"); 

/**
 * Command to load all the todos from the database into the store.
 * 
 * @constructor
 */

function LoadTodosCommand() {
    this.prereq = {
        "db": new DatabaseCommand()
    };
};

LoadTodosCommand.prototype = _.extend({}, BaseCommand.prototype, {
    
    /**
     * Load all the todos
     *
     * @public
     * @param {Function} callback - called with the results of the command.
     * signature: function (err, results)
     */
    
    run: function(err, data, callback) {
        var trans = data.db.transaction(["todos"], "readonly");
        var oStore = trans.objectStore("todos");
        
        oStore.openCursor().onsuccess = function (event) {
            var cursor = event.target.result;
            
            if (cursor) {
                collection.add(cursor.value, {"silent": true});
                cursor.continue();
            } else {
                collection.trigger("load");
                callback(err, true);
            }
        }
    }
});

LoadTodosCommand.prototype.constructor = LoadTodosCommand;
module.exports = LoadTodosCommand;
