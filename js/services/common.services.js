(function () {
    'use strict';

    angular.module('common.services', []).
            factory('lodash', lodash).
            factory('fetchConst', fetchConst).
            factory('calculateDiffDays', calculateDiffDays).
            factory('removeItem', removeItem).
            factory('totalSum', totalSum);


    function totalSum() {
        return function (arrayOfElements) {

            var sum = 0;
            arrayOfElements.items.forEach(function (val) {
                sum = sum + val.amount;
            });
            return sum;
        };
    }
    function removeItem() {
        return function (index, tableModel) {
            if (tableModel.length === 1) {
                return;
            } else {
                tableModel.splice(index, 1);
            }
        };
    }

    function calculateDiffDays() {
        return function (inDate, outDate) {
            //calculations of diff days found here
            //https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
            var timeDiff = Math.abs(inDate.getTime() - outDate.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

            return diffDays;
        };
    }

    function lodash() {
        return _;
    }
    function fetchConst() {
        return [
            {
                items: [
                    {item: "Cash", amount: 0},
                    {item: "Payroll", amount: 500},
                    {item: "Saving", amount: 1000}
                ],
                header: "Monthly income"
            },
            {
                items: [
                    {item: "Fuel", amount: 80},
                    {item: "Gas", amount: 30},
                    {item: "Rent", amount: 150},
                    {item: "Mobile phone", amount: 5},
                    {item: "Electricity", amount: 30},
                    {item: "Phone", amount: 13},
                    {item: "Common", amount: 10},
                    {item: "Water", amount: 10}
                ],
                header: "Monthly expenses"
            },
            {
                items: [
                    {item: "exp1", amount: 0},
                    {item: "exp2", amount: 0},
                    {item: "exp3", amount: 0},
                    {item: "exp4", amount: 0}
                ],
                header: "Extra monthly expenses"
            },
            {
                items: [
                    {item: "Savings", amount: 100},
                    {item: "Savings b/f", amount: 300}
                ],
                header: "Home"
            }
        ];
    }

})();