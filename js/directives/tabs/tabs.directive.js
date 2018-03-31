var ang = require("angular");
let template = require('raw-loader!./tabs.template.html');
ang.module('tabsModule', ['Bootstrap', 'ui.bootstrap']).
        directive('tabElement', tabElement).
        controller('tabController', tabController);

function tabElement() {
    return{
        template: template,
        controller: "tabController",
        controllerAs: "vmController",
        bindToController: true,
        restrict: 'E',
        scope: true,
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

function tabController() {
    let vm = this;
    vm.tabs = [{title: 'Tab'}];

    vm.addNewTab = addNewTab;
    vm.removeTab = removeTab;

    function addNewTab() {
        vm.tabs.splice(vm.tabs.length, 0, {title: 'Tab'});
    }

    function removeTab(event, index) {
        event.preventDefault();
        event.stopPropagation();
        if (vm.tabs.length === 1) {
            return;
        } else {
            vm.tabs.splice(index, 1);
        }
    }

}