/** @jsx React.DOM */
'use strict';

var React = require("React");

var HeaderComponent = require("./header.js");
var MainComponent = require("./main.js");
var FooterComponent = require("./footer.js");
var collection = require("../collections/todos.js");


var AppComponent = React.createClass({
    
    getInitialState: function () {
        return {"todos": collection}
    },
    
    componentDidMount: function() {
        collection.on("all", this.onCollectionChange);
    },
    
    componentWillUnmount: function() {
        collection.off("all", this.onCollectionChange);
    },
    
    onCollectionChange: function () {
        this.setState({"todos": collection});
    },
    
    render: function () {
        var main = "";
        var footer = "";
                
        // only show the todo list and footer if todos exist.
        if (this.state.todos.length > 0) {
            main = (<MainComponent todos={this.state.todos} />);
            footer = (<FooterComponent todos={this.state.todos} />);
        }
        
        return (
    		<section id="todoapp">
                <HeaderComponent />
                {main}
                {footer}
    		</section>
        );
    }
});

module.exports = AppComponent;

