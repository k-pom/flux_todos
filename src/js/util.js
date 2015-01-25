'use strict';

//
// String.format
// Implement a subset of the common .format() functions
//

function format(string) {
    var output = string;
    for (var i = 1; i < arguments.length; i++) {
        var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
        output = output.replace(regEx, arguments[i]);
    }
    return output;
}


module.exports = {
    format: format
}
