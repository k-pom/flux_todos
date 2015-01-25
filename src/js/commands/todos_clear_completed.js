'use strict';

var _ = require('underscore');

var BaseCommand = require('./base.js');
var DatabaseCommand = require('./database.js');

var collection = require("../collections/todos.js"); 

/**
 * Command to clear any completed todo from the indexedDB and the collection.
 * 
 * @constructor
 */

function ClearCompletedTodosCommand() {
    this.prereq = {
        "db": new DatabaseCommand()
    };
};

ClearCompletedTodosCommand.prototype = _.extend({}, BaseCommand.prototype, {
    
    /**
     * Clear out the completed todos.
     *
     * @public
     * @param {Function} callback - called with the results of the command.
     * signature: function (err, results)
     */
    
    run: function(err, data, callback) {
        var trans = data.db.transaction(["todos"], "readwrite");
        var oStore = trans.objectStore("todos");
        var index = oStore.index("completed");
        
        oStore.openCursor().onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                if (!cursor.value.completed) {
                    cursor.continue();
                    return;
                }
                
                var todoId = cursor.value.id;
                var deleteRequest = oStore.delete(todoId);
                deleteRequest.onsuccess = function () {
                    var model = collection.get(todoId);
                    collection.remove(model);
                    cursor.continue();
                    return;
                };
            } else {
                callback(err, true);
            }
        }.bind(this);
    }
});

ClearCompletedTodosCommand.prototype.constructor = ClearCompletedTodosCommand;
module.exports = ClearCompletedTodosCommand;
