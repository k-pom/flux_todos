/** @jsx React.DOM */
'use strict';

var React = require("React");

var UpdateTodoCommand = require("../commands/todos_update.js");
var DeleteTodoCommand = require("../commands/todos_delete.js");


var TodoComponent = React.createClass({
    
    getInitialState: function () {
        return {"editing": false};
    },
    
    render: function () {
        var classes = this.getClasses().join(" ");
        var todo = this.props.todo;
        var that = this;
        
        return (
			<li className={classes}>
				<div className="view">
					<input className="toggle" type="checkbox" checked={todo.get("completed")} onChange={this.onCompletedChange} />
					<label onDoubleClick={that.onLabelClick}>{todo.get("title")}</label>
					<button className="destroy" onClick={that.onDestroy}></button>
				</div>
				<input className="edit" defaultValue={todo.get("title")} onKeyDown={that.onInputKeyDown} />
			</li>
        );
    },
    
    getClasses: function () {
        var classes = [];
        
        if (this.props.todo.get("completed")) {
            classes.push("completed");
        } else if (this.state.editing) {
            classes.push("editing");
        }

        return classes;
    },
    
    onLabelClick: function () {
        this.setState({"editing": true});
    },
    
    onInputKeyDown: function (event) {        
        if (event.key !== "Enter") {
            return;
        }
        
        event.preventDefault();
        this.setState({"editing": false});
        this.props.todo.set({"title": event.target.value});
        this.updateTodo();
    },
    
    onCompletedChange: function (event) {
        this.props.todo.set({"completed": !this.props.todo.get("completed")});
        this.updateTodo();
    },
    
    onDestroy: function (event) {
        this.deleteTodo();
    },
    
    updateTodo: function () {
        new UpdateTodoCommand(this.props.todo).execute();
    },
    
    deleteTodo: function () {
        new DeleteTodoCommand(this.props.todo).execute();
    }
});


module.exports = TodoComponent;
