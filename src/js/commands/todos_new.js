'use strict';

var _ = require('underscore');

var BaseCommand = require('./base.js');
var DatabaseCommand = require('./database.js');

var collection = require("../collections/todos.js"); 

/**
 * Command to create a new todo.
 *
 * @constructor
 * @param {Object} options - attributes of the new todo.
 */

function NewTodoCommand(options) {
    this.options = options;
    this.prereq = {
        "db": new DatabaseCommand()
    };
};

NewTodoCommand.prototype = _.extend({}, BaseCommand.prototype, {
    
    /**
     * Create the new todo.
     *
     * @public
     * @param {Function} callback - called with the results of the command.
     * signature: function (err, results)
     */
    
    run: function(err, data, callback) {
        var trans = data.db.transaction(["todos"], "readwrite");
        var oStore = trans.objectStore("todos");
        
        var request = oStore.add(this.options)
        request.onsuccess = function (event) {
            this.options['id'] = event.target.result;
            collection.add(this.options);
            callback(err, this.options);
        }.bind(this);
    }
});

NewTodoCommand.prototype.constructor = NewTodoCommand;
module.exports = NewTodoCommand;
