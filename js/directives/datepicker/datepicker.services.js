var ang = require("angular");
ang.module('datepickerModule').
        factory('datePicker', datePicker);
function datePicker() {
    return {
        initializeEvents: initializeEvents,
        setDate: setDate,
        toggleMin: toggleMin,
        dateOptions: dateOptions,
        inlineOptions: inlineOptions,
        popup: popup
    };

    function popup() {
        return {
            opened: false
        };
    }
    function inlineOptions() {
        return {
            minDate: new Date(),
            showWeeks: true
        };
    }
    function dateOptions() {
        return  {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };
    }
    function toggleMin(inlineOptions, dateOptions) {
        inlineOptions.minDate = inlineOptions.minDate ? null : new Date();
        dateOptions.minDate = inlineOptions.minDate;
    }
    function setDate(year, month, day) {
        return new Date(year, month, day);
    }
    function initializeEvents() {
        let date = new Date();
        return [
            {
                date: date,
                status: 'full'
            },
            {
                date: date,
                status: 'partially'
            }
        ];
    }
}