(function () {
    'use strict';

    angular.module('datepickerModule', ['common.services']).
            directive('datepickerElement', datepickerElement).
            controller('datepickerController', datepickerController);

    function datepickerElement() {
        return{
            templateUrl: "js/directives/datepicker/datepicker.template.html",
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
    preLink.$inject = ['scope',
        'elem',
        'attr',
        'ctrl'
    ];
    function preLink(scope, elem, attr, ctrl) {
    }

    /**
     * postlinking function
     */
    postLink.$inject = [
        'scope',
        'elem',
        'attr',
        'ctrl'
    ];
    function postLink(scope, elem, attr, ctrl) {
    }

    /**
     * Controller function
     */
    datepickerController.$inject = ['$scope'];
    function datepickerController($scope) {
        var vm = this;

        vm.popup = {
            opened: false
        };
        vm.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        vm.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };
        vm.format = 'dd-MM-yyyy';



        vm.toggleMin = toggleMin;
        vm.openDatepicker = openDatepicker;
        vm.setDate = setDate;

        initializeDatepicker();
        vm.toggleMin();

        function toggleMin() {
            vm.inlineOptions.minDate = vm.inlineOptions.minDate ? null : new Date();
            vm.dateOptions.minDate = vm.inlineOptions.minDate;
        }



        function openDatepicker() {
            vm.popup.opened = true;
        }


        function setDate(year, month, day) {
            vm.datepickerdata = new Date(year, month, day);
        }



        function initializeDatepicker() {

            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            var afterTomorrow = new Date();
            afterTomorrow.setDate(tomorrow.getDate() + 1);
            vm.events = [
                {
                    date: tomorrow,
                    status: 'full'
                },
                {
                    date: afterTomorrow,
                    status: 'partially'
                }
            ];
        }

        function getDayClass(data) {
            var date = data.date,
                    mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < vm.events.length; i++) {
                    var currentDay = new Date(vm.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return vm.events[i].status;
                    }
                }
            }

            return '';
        }
    }

})();