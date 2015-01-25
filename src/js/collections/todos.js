'use strict';

var Backbone = require("Backbone");


var Todo = Backbone.Model.extend({
    defaults: {
        "title": "New Todo",
        "completed": false
    }
});


var todos = new Backbone.Collection([], {
    model: Todo
});


module.exports = todos;
