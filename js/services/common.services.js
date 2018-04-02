var ang = require("angular");
ang.module('common.services', []).
        factory('lodash', lodash).
        factory('fetchConst', fetchConst).
        factory('calculate', calculate).
        factory('localStorage', localStorage);


localStorage.$inject = ['$localStorage'];
function localStorage($localStorage) {
    return {
        saveToLocalStorage: saveToLocalStorage,
        loadFromLocalStorage: loadFromLocalStorage
    };

    function saveToLocalStorage(model) {
        $localStorage.ViewModel = model.ViewModel;
        $localStorage.monthlyIncome = model.monthlyIncome;
        $localStorage.monthlyExpenses = model.monthlyExpenses;
        $localStorage.balance = model.balance;
        $localStorage.percentage = model.percentage;
        $localStorage.resultsChart = model.resultsChart;
        $localStorage.resultsPercentageChart = model.resultsPercentageChart;
        $localStorage.dateIn = model.dateIn;
        $localStorage.dateOut = model.dateOut;
    }
    function loadFromLocalStorage(model) {
        model.ViewModel = $localStorage.ViewModel;
        model.monthlyIncome = $localStorage.monthlyIncome;
        model.monthlyExpenses = $localStorage.monthlyExpenses;
        model.balance = $localStorage.balance;
        model.percentage = $localStorage.percentage;
        model.resultsChart = $localStorage.resultsChart;
        model.resultsPercentageChart = $localStorage.resultsPercentageChart;
        model.dateIn = $localStorage.dateIn;
        model.dateOut = $localStorage.dateOut;
    }

}


function calculate() {
    return {
        expenses: expenses
    };

    function diffDays(inDate, outDate) {
        //calculations of diff days found here
        //https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
        let timeDiff = Math.abs(inDate.getTime() - outDate.getTime());
        let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

        return diffDays;
    }

    function totalSum(arrayOfElements) {
        let sum = 0;
        arrayOfElements.items.forEach((val) => sum += val.amount);
        return sum;
    }
    function expenses(model) {
        let inDate = new Date(model.dateIn);
        let outDate = new Date(model.dateOut);
        let income = model.ViewModel[0];
        let expenses = model.ViewModel[1];
        let extra = model.ViewModel[2];
        let savings = model.ViewModel[3];



        model.monthlyIncome = totalSum(income);
        model.monthlyExpenses = totalSum(expenses) + totalSum(extra) + totalSum(savings);
        model.balance = model.monthlyIncome - model.monthlyExpenses;
        model.perDay = model.balance / diffDays(inDate, outDate);
        model.percentage = (model.balance * 100) / model.monthlyIncome;
        model.resultsChart = [
            [model.monthlyIncome, model.monthlyExpenses, model.balance, model.perDay]
        ];
        model.resultsPercentageChart = [
            [model.percentage, 100]
        ];
    }
}

function lodash() {
    return _;
}
function fetchConst() {
    return {
        initData: initData,
        labels: labels,
        labelsPercentage: labelsPercentage,
        seriesPercentage: seriesPercentage
    };

    function labels() {
        return ["Monthly income", "Monthly expenses", "Balance", "Per day"];
    }
    function seriesPercentage() {
        return ['Percentage'];
    }
    function labelsPercentage() {
        return ["", ""];
    }
    function initData() {
        return [
            {
                items: [
                    {item: "Cash", amount: 0},
                    {item: "Payroll", amount: 500},
                    {item: "Saving", amount: 500}
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
}
