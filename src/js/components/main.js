/** @jsx React.DOM */
'use strict';

var React = require("React");

var TodoComponent = require("./todo.js");

var SetCompletedTodosCommand = require("../commands/todos_set_completed.js");


var MainComponent = React.createClass({
    render: function () {
        
        var todoList = this.props.todos.map(function (todo) {
            return (<TodoComponent key={todo.id} todo={todo} />);
        });
        
        return (
			<section id="main">
				<input id="toggle-all" type="checkbox" onChange={this.onToggleChange} />
				<label htmlFor="toggle-all">Mark all as complete</label>
                <ul id="todo-list">
                    {todoList}
				</ul>
			</section>
        );
    },
    
    onToggleChange: function (event) {
        new SetCompletedTodosCommand(event.target.checked).execute();
    }
});


module.exports = MainComponent;
