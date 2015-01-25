# TodoMVC Using Flux with Commands

This is an implementation of the [TodoMVC](http://todomvc.com/) project template using [React](http://facebook.github.io/react/), [Backbone.js](http://backbonejs.org/), and [async](https://github.com/caolan/async).

The big difference between this setup and the standard Flux architecture is the removal of actions and the dispatcher in favor of a command hierarchy.  This allows for us to handle interdependant asyncronous actions in a clean way.  See ```\src\js\commands\base.js``` for more information.

To acurately simulate asyncronous actions, I've forgone using the standard localStorage for todo persistance in favor of indexedDB.

## Setup

Simply clone the repo locally, then:

    npm install
    grunt

The app then will be served at http://localhost:8080
