(function () {
    'use strict';

    angular.module('tableModule', ['common.services']).
            run(loadTemplates).
            directive('tableElement', tableElement).
            controller('tableController', tableController);

    loadTemplates.$inject = ['$templateCache'];
    function loadTemplates($templateCache) {
        $templateCache.put('table.template.html', require('./table.template.html'));
    }

    tableElement.$inject = ['$templateCache'];
    function tableElement($templateCache) {
        return{
            template: $templateCache.get('table.template.html'),
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
        'removeItem'
    ];
    function tableController($scope, $timeout, removeItem) {
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