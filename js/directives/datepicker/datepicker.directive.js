let template = require('raw-loader!./datepicker.template.html');
var ang = require("angular");
ang.module('datepickerModule', []).
        directive('datepickerElement', datepickerElement).
        controller('datepickerController', datepickerController);

function datepickerElement() {
    return{
        template: template,
        controller: "datepickerController",
        controllerAs: "vmController",
        bindToController: true,
        restrict: 'E',
        scope: {datepickerdata: '=', placehold: '='},
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
datepickerController.$inject = ['datePicker'];
function datepickerController(datePicker) {
    let vm = this;

    /**
     * Ctrl variables
     */
    vm.popup = datePicker.popup();
    vm.inlineOptions = datePicker.inlineOptions();
    vm.dateOptions = datePicker.dateOptions();
    vm.format = 'dd-MM-yyyy';


    /**
     * Ctrl function
     */
    vm.toggleMin = toggleMin;
    vm.openDatepicker = openDatepicker;
    vm.setDate = setDate;

    initializeDatepicker();
    vm.toggleMin();

    function toggleMin() {
        datePicker.toggleMin(vm.inlineOptions, vm.dateOptions);
    }

    function openDatepicker() {
        vm.popup.opened = true;
    }

    function setDate(year, month, day) {
        vm.datepickerdata = datePicker.setDate(year, month, day);
    }

    function initializeDatepicker() {
        vm.events = datePicker.initializeEvents();
    }
}