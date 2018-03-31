let template = require('raw-loader!./results-table.template.html');
var ang = require("angular");
ang.module('resultsTableModule', []).
        directive('resultsTableElement', tableElement).
        controller('resultsTableController', resultsTableController);

function tableElement() {
    return{
        template: template,
        controller: "resultsTableController",
        controllerAs: "vmController",
        bindToController: true,
        restrict: 'E',
        scope: {
            monthlyincome: '=',
            monthlyexpenses: '=',
            balance: '=',
            perday: '='
        },
        link: linkFunction()
    };
}

function linkFunction() {
    return{
        pre: preLink,
        post: postLink
    };
}

/**
 * prelinking function
 */
function preLink(scope, elem, attr, ctrl) {
}

/**
 * postlinking function
 */
function postLink(scope, elem, attr, ctrl) {
}

/**
 * Controller function
 */

function resultsTableController() {
}
