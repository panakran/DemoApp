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
                    {item: "Payroll", amount: 0},
                    {item: "Saving", amount: 0}
                ],
                header: "Monthly income"
            },
            {
                items: [
                    {item: "Fuel", amount: 0},
                    {item: "Gas", amount: 0},
                    {item: "Rent", amount: 0},
                    {item: "Mobile phone", amount: 0},
                    {item: "Electricity", amount: 0},
                    {item: "Phone", amount: 0},
                    {item: "Common", amount: 0},
                    {item: "Water", amount: 0}
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
                    {item: "Savings", amount: 0},
                    {item: "Savings b/f", amount: 0}
                ],
                header: "Home"
            }
        ];
    }

})();