'use strict';

var _ = require('underscore');

var BaseCommand = require('./base.js');
var DatabaseCommand = require('./database.js');

var collection = require("../collections/todos.js"); 

/**
 * Command update a todo.
 *
 * @constructor
 * @param {Object} todo - backbone.js model to update
 */

function UpdateTodoCommand(todo) {
    this.todo = todo;
    this.prereq = {
        "db": new DatabaseCommand()
    };
};

UpdateTodoCommand.prototype = _.extend({}, BaseCommand.prototype, {

    /**
     * Update the todo.
     *
     * @public
     * @param {Function} callback - called with the results of the command.
     * signature: function (err, results)
     */

    run: function(err, data, callback) {
        var trans = data.db.transaction(["todos"], "readwrite");
        var oStore = trans.objectStore("todos");
        var data = _.clone(this.todo.attributes);
        
        var request = oStore.put(data);
                
        request.onsuccess = function (event) {
            collection.add(this.todo, {merge: true});
            callback(err, this.todo);
        }.bind(this);
    }
});

UpdateTodoCommand.prototype.constructor = UpdateTodoCommand;
module.exports = UpdateTodoCommand;
