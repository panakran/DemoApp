(function () {
    'use strict';

    /**
     * Bootstap module
     */
    angular.module('Bootstrap', ['common.services', '720kb.datepicker']).
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
    BootstrapController.$inject = ['$scope', 'fetchConst', '$timeout'];
    function BootstrapController($scope, fetchConst, $timeout) {
        var vm = this;
        vm.AddItem = AddItem;
        vm.RemoveItem = RemoveItem;
        vm.ViewModel = fetchConst;
        vm.inputFocus = inputFocus;

        /**
         * focuses on selected input 
         * we need to do this in order to trigger .focus on input
         * Angular issue ng-focus only triggers the focus event and doent actually apply .focus on element
         * @param {type} event
         * @return {undefined}
         */
        function inputFocus(event) {
            console.log("event", event.target.nextElementSibling);
            $timeout(function () {
                // use a timout to foucus outside this digest cycle!
                //FIXME: which one is better siblings or next
                $(event.target).siblings('input').focus(); //use focus function instead of autofocus attribute to avoid cross browser problem. And autofocus should only be used to mark an element to be focused when page loads.
            }, 0);

        }

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