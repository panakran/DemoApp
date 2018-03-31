var ang = require("angular");
let template = require('raw-loader!./table.template.html');
ang.module('tableModule', []).
        directive('tableElement', tableElement).
        controller('tableController', tableController);

function tableElement() {
    return{
        template: template,
        controller: "tableController",
        controllerAs: "vmController",
        bindToController: true,
        restrict: 'E',
        scope: {tabledata: '='},
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
tableController.$inject = [
    '$scope',
    '$timeout',
    'table'
];
function tableController($scope, $timeout, table) {
    let vm = this;

    vm.AddItem = AddItem;
    vm.RemoveItem = RemoveItem;
    vm.inputFocus = inputFocus;
    vm.calculateExpensesEventTrigger = calculateExpensesEventTrigger;


    function calculateExpensesEventTrigger(event) {
        $scope.$emit('calculateExpensesEvent');

    }

    function inputFocus(event) {
        $timeout(function () {
            $(event.target).children('input').focus().select();
            $(event.target).siblings('input').focus().select();
        }, 0);

    }

    /**
     * Add items function
     * - adds a new item to the given table model
     * @param {type} item
     * @return {undefined}
     */
    function AddItem(tableModel) {
        table.addItem(tableModel);
    }

    /**
     * Removes an item based on his index from a table model given
     * @param {type} index
     * @param {type} model
     * @return {undefined}
     */
    function RemoveItem(index, tableModel) {
        table.removeItem(index, tableModel);
    }
}
