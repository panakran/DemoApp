(function () {
    'use strict';

    angular.module('resultsTableModule', []).
            run(loadTemplates).
            directive('resultsTableElement', tableElement).
            controller('resultsTableController', resultsTableController);

    loadTemplates.$inject = ['$templateCache'];
    function loadTemplates($templateCache) {
        $templateCache.put('results-table.template.html', require('./results-table.template.html'));
    }

    tableElement.$inject = ['$templateCache'];
    function tableElement($templateCache) {
        return{
            template: $templateCache.get('results-table.template.html'),
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