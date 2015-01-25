'use strict';

var _ = require('underscore');

var BaseCommand = require('./base.js');
var DatabaseCommand = require('./database.js');

var collection = require("../collections/todos.js"); 

/**
 * Command to delete a specified todo.
 *
 * @constructor
 * @param {Object} todo - the todo that needs deleting.
 */

function DeleteTodoCommand(todo) {
    this.todo = todo;
    this.prereq = {
        "db": new DatabaseCommand()
    };
};

DeleteTodoCommand.prototype = _.extend({}, BaseCommand.prototype, {
    
    /**
     * Delete the specified todo.
     *
     * @public
     * @param {Function} callback - called with the results of the command.
     * signature: function (err, results)
     */
    
    run: function(err, data, callback) {
        var trans = data.db.transaction(["todos"], "readwrite");
        var oStore = trans.objectStore("todos");
        var request = oStore.delete(this.todo.get("id"));
                
        request.onsuccess = function (event) {
            collection.remove(this.todo);
            callback(err, true);
        }.bind(this);
    }
});

DeleteTodoCommand.prototype.constructor = DeleteTodoCommand;
module.exports = DeleteTodoCommand;
