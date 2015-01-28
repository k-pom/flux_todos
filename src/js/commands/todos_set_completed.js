'use strict';

var _ = require('underscore');

var BaseCommand = require('./base.js');
var DatabaseCommand = require('./database.js');

var collection = require("../collections/todos.js"); 

/**
 * Command to set the completed state of all the todos.
 * 
 * @constructor
 * @param {Boolean} toggle - the expected state of all the todos.
 */

function SetCompletedTodosCommand(toggle) {
    this.toggle = toggle;
    this.prereq = {
        "db": new DatabaseCommand()
    };
};

SetCompletedTodosCommand.prototype = _.extend({}, BaseCommand.prototype, {
    
    /**
     * Set the completed state of all the todos.
     *
     * @public
     * @param {Function} callback - called with the results of the command.
     * signature: function (err, results)
     */
    
    run: function(err, data, callback) {
        var trans = data.db.transaction(["todos"], "readwrite");
        var oStore = trans.objectStore("todos");
        
        oStore.openCursor().onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                if (cursor.value.completed === this.toggle) {
                    cursor.continue();
                    return;
                }
                
                var todo = collection.get(cursor.value.id);
                todo.set({"completed": this.toggle});
                var attrs = _.clone(todo.attributes);

                var request = oStore.put(attrs);
                request.onsuccess = function (event) {
                    collection.add(todo, {merge: true, silent: true});
                    cursor.continue();
                };
            } else {
                collection.trigger("setcompleted");
                callback(err, true);
            }
        }.bind(this);
    }
});

SetCompletedTodosCommand.prototype.constructor = SetCompletedTodosCommand;
module.exports = SetCompletedTodosCommand;