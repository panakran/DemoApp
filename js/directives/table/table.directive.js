(function () {
    'use strict';

    angular.module('tableModule', ['common.services']).
            directive('tableElement', tableElement).
            controller('tableController', tableController);

    function tableElement() {
        return{
            templateUrl: "js/directives/table/table.template.html",
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
    preLink.$inject = ['scope',
        'elem',
        'attr',
        'ctrl'
    ];
    function preLink(scope, elem, attr, ctrl) {
    }

    /**
     * postlinking function
     */
    postLink.$inject = [
        'scope',
        'elem',
        'attr',
        'ctrl'
    ];
    function postLink(scope, elem, attr, ctrl) {
    }

    /**
     * Controller function
     */
    tableController.$inject = [
        '$scope',
        'fetchConst',
        '$timeout',
        'totalSum',
        'calculateDiffDays',
        'removeItem'
    ];
    function tableController($scope, fetchConst, $timeout, totalSum, calculateDiffDays, removeItem) {
        var vm = this;

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
            tableModel.push({item: "New", amount: 0});
        }

        /**
         * Removes an item based on his index from a table model given
         * @param {type} index
         * @param {type} model
         * @return {undefined}
         */
        function RemoveItem(index, tableModel) {
            removeItem(index, tableModel);
        }
    }

})();