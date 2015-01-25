/** @jsx React.DOM */
'use strict';

var React = require("React");

var ClearCompletedTodosCommand = require("../commands/todos_clear_completed.js");


var FooterComponent = React.createClass({    
    render: function () {
        var that = this;
        
        return (
			<footer id="footer">
				<span id="todo-count"><strong>{this.getTodoCount()}</strong> item left</span>
				<button id="clear-completed" onClick={that.clearCompleted}>Clear completed ({this.getCompletedCount()})</button>
			</footer>
        );
    },
    
    getTodoCount: function () {
        return this.props.todos.where({"completed": false}).length;
    },
    
    getCompletedCount: function () {
        return this.props.todos.where({"completed": true}).length;
    },
    
    clearCompleted: function () {
        new ClearCompletedTodosCommand().execute();
    }
});


module.exports = FooterComponent;
