(function () {
    'use strict';

    angular.module('resultsTableModule', []).
            directive('resultsTableElement', tableElement).
            controller('resultsTableController', resultsTableController);

    function tableElement() {
        return{
            templateUrl: "js/directives/results-table/results-table.template.html",
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
    resultsTableController.$inject = [
        '$scope',
        'fetchConst',
        '$timeout',
        'totalSum',
        'calculateDiffDays',
        'removeItem'
    ];
    function resultsTableController($scope, fetchConst, $timeout, totalSum, calculateDiffDays, removeItem) {
        var vm = this;
    }

})();