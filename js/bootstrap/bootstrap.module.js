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
    let eventCalculateExpensesEvent = (event, data) => vm.calculateExpenses();
    let watcherDateIn = (event, data) => vm.calculateExpenses();
    let watcherDateOut = (event, data) => vm.calculateExpenses();
    vm.onClick = (points, evt) => console.log(points, evt);
    vm.$onClick = (points, evt) => console.log(points, evt);
    vm.onClickPercentage = (points, evt) => console.log(points, evt);
    vm.saveToLocalStorage = () => localStorage.saveToLocalStorage(vm);
    vm.calculateExpenses = () => calculate.expenses(vm);
    vm.loadFromLocalStorage = () => localStorage.loadFromLocalStorage(vm);
    vm.initializeModel = () => {
        vm.ViewModel = fetchConst.initData();
        vm.monthlyIncome = 0;
        vm.monthlyExpenses = 0;
        vm.balance = 0;
        vm.perDay = 0;
        vm.percentage = 0;
        vm.fadeColor = [];
        vm.dateIn = "";
        vm.dateOut = "";
    };

    vm.tabs = [
        {title: 'Dynamic Title 1', content: 'Dynamic content 1'},
        {title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true}
    ];

    vm.model = {
        name: 'Tabs'
    };

    vm.labels = fetchConst.labels();
    vm.labelsPercentage = fetchConst.labelsPercentage();
    vm.seriesPercentage = fetchConst.seriesPercentage();

    $scope.$on('calculateExpensesEvent', eventCalculateExpensesEvent);
    $scope.$watch('vmController.dateIn', watcherDateIn);
    $scope.$watch('vmController.dateOut', watcherDateOut);

    vm.initializeModel();
    vm.calculateExpenses();

}

//debug mode enable/disable
let DEBUG = true;
if (!DEBUG) {
    console.log = () => {
    };
}
