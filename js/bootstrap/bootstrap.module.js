(function () {
    'use strict';

    /**
     * Bootstap module
     */
    angular.module('Bootstrap', ['common.services', '720kb.datepicker', 'chart.js']).
            config(chartConfig).
            directive('budgetApp', budgetApp).
            controller('BootstrapController', BootstrapController);

    /**
     * char configuration method
     * use to set the initial options and configuration for chart.js
     */
    chartConfig.$inject = ['ChartJsProvider'];
    function chartConfig(ChartJsProvider) {
        // Configure all charts
        ChartJsProvider.setOptions({
            chartColors: ['#FF5252', '#FF8A80'],
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
        ////////////////////
        vm.labels = ["Monthly income", "Monthly expenses", "Balance", "Per day"];

        vm.onClick = function (points, evt) {
            console.log(points, evt);
        };
        /////////////////
        //
        ////////////////////
        vm.labelsPercentage = ["", ""];
        vm.seriesPercentage = ['Percentage'];

        vm.onClickPercentage = function (points, evt) {
            console.log(points, evt);
        };
        /////////////////
        vm.AddItem = AddItem;
        vm.RemoveItem = RemoveItem;
        vm.ViewModel = fetchConst;
        vm.inputFocus = inputFocus;
        vm.monthlyIncome = 0;
        vm.monthlyExpenses = 0;
        vm.balance = 0;
        vm.perDay = 0;
        vm.percentage = 0;
        vm.calculateExpenses = calculateExpenses;

        vm.calculateExpenses();

        function calculateExpenses() {
            var income = 0;
            var expenses = 0;
            var extra = 0;
            var savings = 0;
            var inDate = new Date(vm.dateIn);
            var outDate = new Date(vm.dateOut);

            //calculations of diff days found here
            //https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
            var timeDiff = Math.abs(inDate.getTime() - outDate.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

            angular.forEach(vm.ViewModel[0].items, function (val) {
                income = income + val.amount;
            });

            angular.forEach(vm.ViewModel[1].items, function (val) {
                expenses = expenses + val.amount;
            });

            angular.forEach(vm.ViewModel[2].items, function (val) {
                extra = extra + val.amount;
            });
            angular.forEach(vm.ViewModel[3].items, function (val) {
                savings = savings + val.amount;
            });


            vm.monthlyIncome = income;
            vm.monthlyExpenses = expenses + extra + savings;
            vm.balance = vm.monthlyIncome - vm.monthlyExpenses;
            vm.perDay = vm.balance / diffDays;
            vm.percentage = (vm.balance * 100) / vm.monthlyIncome;
            vm.data = [
                [vm.monthlyIncome, vm.monthlyExpenses, vm.balance, vm.perDay]
            ];
            vm.dataPercentage = [
                [vm.percentage, 100]
            ];
        }


        /**
         * focuses on selected input 
         * -we need to do this in order to trigger .focus on input
         * -Angular issue ng-focus only triggers the focus event and doesnt actually apply .focus on element
         * -use a timeout to focus outside this digest cycle!
         * -use focus function instead of autofocus attribute to avoid cross browser problem
         * and autofocus should only be used to mark an element to be focused when page loads.
         * -FIXME: which one is better siblings or next
         * @param {type} event
         * @return {undefined}
         */
        function inputFocus(event) {
            console.log("event", event.target);
            $timeout(function () {
                $(event.target).children('input').focus();
                $(event.target).siblings('input').focus();
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