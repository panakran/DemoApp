(function () {
    'use strict';

    angular.module('common.services', []).
            factory('lodash', lodash).
            factory('fetchConst', fetchConst);

    function lodash() {
        return _;
    }
    function fetchConst() {
        return [
            {
                items: [
                    {item: "Cash", amount: 0},
                    {item: "Payroll", amount: 700},
                    {item: "Saving", amount: 400}
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