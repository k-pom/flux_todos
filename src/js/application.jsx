'use strict';

// This needs to happen before anything is required
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;

var React = require("React");
var LoadTodosCommand = require('./commands/todos_load.js');
var AppComponent = require("./components/app.js");

// method run when the application starts
$(document).ready(function () {
    new LoadTodosCommand().execute(function () {
        React.renderComponent(new AppComponent(), $("#container").get(0));
    });
});
