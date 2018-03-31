import 'bootstrap/dist/css/bootstrap.min.css';
import 'angular-ui-bootstrap/dist/ui-bootstrap-csp.css';
var ang = require("angular");

/**
 * Bootstap module
 */
let template = require('raw-loader!./bootstrap.html');

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
        config(chartConfig).
        directive('budgetApp', budgetApp).
        controller('bootstrapController', bootstrapController);


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
function budgetApp() {
    return{
        template: template,
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
    'calculate',
    'localStorage'
];
function bootstrapController($scope, fetchConst, calculate, localStorage) {

    let vm = this;

    vm.labels = fetchConst.labels();
    vm.labelsPercentage = fetchConst.labelsPercentage();
    vm.seriesPercentage = fetchConst.seriesPercentage();

    vm.initializeModel = initializeModel;
    vm.calculateExpenses = calculateExpenses;
    vm.saveToLocalStorage = saveToLocalStorage;
    vm.loadFromLocalStorage = loadFromLocalStorage;
    vm.onClick = onClick;
    vm.$onClick = $onClick;
    vm.onClickPercentage = onClickPercentage;
    vm.initializeModel();
    vm.calculateExpenses();

    $scope.$on('calculateExpensesEvent', eventCalculateExpensesEvent);
    $scope.$watch('vmController.dateIn', watcherDateIn);
    $scope.$watch('vmController.dateOut', watcherDateOut);


    function onClick(points, evt) {
        console.log(points, evt);
    }
    function $onClick(points, evt) {
        console.log(points, evt);
    }

    function onClickPercentage(points, evt) {
        console.log(points, evt);
    }




    function eventCalculateExpensesEvent(event, data) {
        calculateExpenses();
    }

    function watcherDateIn(event, data) {
        calculateExpenses();
    }
    function watcherDateOut(event, data) {
        calculateExpenses();
    }

    function initializeModel() {
        vm.ViewModel = fetchConst.initData();
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
        localStorage.saveToLocalStorage(vm);
    }

    function loadFromLocalStorage() {
        localStorage.loadFromLocalStorage(vm);
    }

    function calculateExpenses() {

        let inDate = new Date(vm.dateIn);
        let outDate = new Date(vm.dateOut);
        let income = vm.ViewModel[0];
        let expenses = vm.ViewModel[1];
        let extra = vm.ViewModel[2];
        let savings = vm.ViewModel[3];



        vm.monthlyIncome = calculate.totalSum(income);
        vm.monthlyExpenses = calculate.totalSum(expenses) + calculate.totalSum(extra) + calculate.totalSum(savings);
        vm.balance = vm.monthlyIncome - vm.monthlyExpenses;
        vm.perDay = vm.balance / calculate.diffDays(inDate, outDate);
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
let DEBUG = true;
if (!DEBUG) {
    console.log = function () {};
}
