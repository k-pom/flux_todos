/** @jsx React.DOM */
'use strict';

var React = require("React");

var TodoComponent = require("./todo.js");


var MainComponent = React.createClass({
    render: function () {
        
        var todoList = this.props.todos.map(function (todo) {
            return (<TodoComponent key={todo.id} todo={todo} />);
        });
        
        return (
			<section id="main">
				<input id="toggle-all" type="checkbox" />
				<label htmlFor="toggle-all">Mark all as complete</label>
                <ul id="todo-list">
                    {todoList}
				</ul>
			</section>
        );
    }
});


module.exports = MainComponent;
