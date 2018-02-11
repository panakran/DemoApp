import 'bootstrap/dist/css/bootstrap.min.css';
import 'angular-ui-bootstrap/dist/ui-bootstrap-csp.css';
var ang = require("angular");
(function () {
    'use strict';
    /**
     * Bootstap module
     */
    ang.module('Bootstrap', [
        'chart.js',
        'ngAnimate',
        'ngSanitize',
        'ui.bootstrap',
        'datepickerModule',
        'common.services',
        'tableModule',
        'resultsTableModule',
        'ngStorage'
    ]).
            run(loadTemplates).
            config(chartConfig).
            directive('budgetApp', budgetApp).
            controller('bootstrapController', bootstrapController);

    loadTemplates.$inject = ['$templateCache'];
    function loadTemplates($templateCache) {
        $templateCache.put('bootstrap.html', require('./bootstrap.html'));
    }

    /**
     * char configuration method
     * use to set the initial options and configuration for chart.js
     */
    chartConfig.$inject = ['ChartJsProvider'];
    function chartConfig(ChartJsProvider) {
        // Configure all charts
        ChartJsProvider.setOptions({
            chartColors: ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
            responsive: false
        });
        // Configure all line charts
        ChartJsProvider.setOptions('line', {
            showLines: false
        });
    }

    /**
     * Directive function
     * @return {bootstrap-moduleL#1.budgetApp.bootstrap-moduleAnonym$0}
     */
    loadTemplates.$inject = ['$templateCache'];
    function budgetApp($templateCache) {
        return{
            template: $templateCache.get('bootstrap.html'),
            controller: "bootstrapController",
            controllerAs: "vmController",
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
    bootstrapController.$inject = [
        '$scope',
        'fetchConst',
        'totalSum',
        'calculateDiffDays',
        '$localStorage'
    ];
    function bootstrapController($scope, fetchConst, totalSum, calculateDiffDays, $localStorage) {

        var vm = this;
console.log("scope", $scope);
        vm.labels = ["Monthly income", "Monthly expenses", "Balance", "Per day"];

        vm.onClick = function (points, evt) {
            console.log(points, evt);
        };
        vm.$onClick = function (points, evt) {
            console.log(points, evt);
        };

        vm.labelsPercentage = ["", ""];
        vm.seriesPercentage = ['Percentage'];

        vm.onClickPercentage = function (points, evt) {
            console.log(points, evt);
        };

        vm.initializeModel = initializeModel;
        vm.calculateExpenses = calculateExpenses;
        vm.saveToLocalStorage = saveToLocalStorage;
        vm.loadFromLocalStorage = loadFromLocalStorage;
        vm.initializeModel();
        vm.calculateExpenses();


        $scope.$on('calculateExpensesEvent', function (event, data) {
            calculateExpenses();
        });

        $scope.$watch('vmController.dateIn', function (event, data) {
            calculateExpenses();
        });
        $scope.$watch('vmController.dateOut', function (event, data) {
            calculateExpenses();
        });

        function initializeModel() {
            vm.ViewModel = fetchConst;
            vm.monthlyIncome = 0;
            vm.monthlyExpenses = 0;
            vm.balance = 0;
            vm.perDay = 0;
            vm.percentage = 0;
            vm.fadeColor = [];
            vm.dateIn = "";
            vm.dateOut = "";

        }

        function saveToLocalStorage() {
            $localStorage.ViewModel = vm.ViewModel;
            $localStorage.monthlyIncome = vm.monthlyIncome;
            $localStorage.monthlyExpenses = vm.monthlyExpenses;
            $localStorage.balance = vm.balance;
            $localStorage.percentage = vm.percentage;
            $localStorage.resultsChart = vm.resultsChart;
            $localStorage.resultsPercentageChart = vm.resultsPercentageChart;
            $localStorage.dateIn = vm.dateIn;
            $localStorage.dateOut = vm.dateOut;
        }

        function loadFromLocalStorage() {
            vm.ViewModel = $localStorage.ViewModel;
            vm.monthlyIncome = $localStorage.monthlyIncome;
            vm.monthlyExpenses = $localStorage.monthlyExpenses;
            vm.balance = $localStorage.balance;
            vm.percentage = $localStorage.percentage;
            vm.resultsChart = $localStorage.resultsChart;
            vm.resultsPercentageChart = $localStorage.resultsPercentageChart;
            vm.dateIn = $localStorage.dateIn;
            vm.dateOut = $localStorage.dateOut;

        }

        function calculateExpenses() {

            var inDate = new Date(vm.dateIn);
            var outDate = new Date(vm.dateOut);
            var income = vm.ViewModel[0];
            var expenses = vm.ViewModel[1];
            var extra = vm.ViewModel[2];
            var savings = vm.ViewModel[3];



            vm.monthlyIncome = totalSum(income);
            vm.monthlyExpenses = totalSum(expenses) + totalSum(extra) + totalSum(savings);
            vm.balance = vm.monthlyIncome - vm.monthlyExpenses;
            vm.perDay = vm.balance / calculateDiffDays(inDate, outDate);
            vm.percentage = (vm.balance * 100) / vm.monthlyIncome;
            vm.resultsChart = [
                [vm.monthlyIncome, vm.monthlyExpenses, vm.balance, vm.perDay]
            ];
            vm.resultsPercentageChart = [
                [vm.percentage, 100]
            ];
        }
        
    }

    //debug mode enable/disable
    var DEBUG = true;
    if (!DEBUG) {
        console.log = function () {};

    }
})();