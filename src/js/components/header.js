/** @jsx React.DOM */
'use strict';

var React = require("React");

var NewTodoCommand = require("../commands/todos_new.js");


var HeaderComponent = React.createClass({
    render: function () {
        return (
			<header id="header">
				<h1>todos</h1>
				<input id="new-todo" ref="newTodo" placeholder="What needs to be done?" autofocus onKeyDown={this.onInputKeyDown} />
			</header>
        );
    },
    
    onInputKeyDown: function (event) {        
        if (event.key !== "Enter") {
            return;
        }
                
        event.preventDefault();
        new NewTodoCommand({"title": event.currentTarget.value}).execute(function () {
            this.refs.newTodo.getDOMNode().value = "";
        }.bind(this));
    }
});


module.exports = HeaderComponent;
