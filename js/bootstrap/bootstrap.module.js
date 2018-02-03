(function () {
    'use strict';

    /**
     * Bootstap module
     */
    angular.module('Bootstrap', ['common.services']).
            directive('budgetApp', budgetApp).
            controller('BootstrapController', BootstrapController);



    /**
     * Directive function
     * @return {bootstrap-moduleL#1.budgetApp.bootstrap-moduleAnonym$0}
     */
    function budgetApp() {
        return{
            templateUrl: "js/bootstrap/bootstrap.html",
            controller: "BootstrapController",
            controllerAs: "bootstrapController",
            bindToController: true,
            restrict: 'E',
            scope: true,
            link: linkFunction()
        };
    }

    /**
     * Linking function
     * @return {bootstrap-moduleL#1.linkFunction.bootstrap-moduleAnonym$1}
     */
    function linkFunction() {
        return{
            pre: preLink,
            post: postLink
        };
    }

    /**
     * prelinking function
     */
    preLink.$inject = ['scope', 'elem', 'attr', 'ctrl'];
    function preLink(scope, elem, attr, ctrl) {
        console.log("preLink::", scope);
    }

    /**
     * postlinking function
     */
    postLink.$inject = ['scope', 'elem', 'attr', 'ctrl'];
    function postLink(scope, elem, attr, ctrl) {
        console.log("postLink::", scope);
    }

    /**
     * Controller function
     */
    BootstrapController.$inject = ['$scope', 'fetchConst'];
    function BootstrapController($scope, fetchConst) {
        var vm = this;
        vm.AddItem = AddItem;
        vm.RemoveItem = RemoveItem;
        vm.ViewModel = fetchConst;

        /**
         * Add items function
         * - adds a new item to the given table model
         * @param {type} item
         * @return {undefined}
         */
        function AddItem(tableModel) {
            console.log("AddItem", tableModel);
            tableModel.push({item: "New", amount: 0});
        }

        /**
         * Removes an item based on his index from a table model given
         * @param {type} index
         * @param {type} model
         * @return {undefined}
         */
        function RemoveItem(index, tableModel) {
            console.log("RemoveItem", index, tableModel);
            if (tableModel.length === 1) {
                return;
            } else {
                tableModel.splice(index, 1);
            }
        }

        console.log("vm::", vm.ViewModel);
    }

    //debug mode enable/disable
    var DEBUG = true;
    if (!DEBUG) {
        console.log = function () {};

    }
})();