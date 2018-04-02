let ang = require("angular");
const template = require('raw-loader!./tabs.template.html');

class TabElement {

    constructor()
    {
        this.template = template;
        this.controller = "tabController";
        this.controllerAs = "vmController";
        this.bindToController = true;
        this.restrict = 'E';
        this.scope = true;
//        not working
        this.link = () => {
            return{
                pre: (scope, elem, attr, ctrl)=>console.log(scope),
                post: (scope, elem, attr, ctrl)=>console.log(scope)
            };
        };
    }
}


/**
 * Controller function
 */
//constants
const DEFAULT_TITLE = {title: 'Tab', active: 'true'};
//class definition
class TabController {

    //constructor definition
    //services injected here like constructor params
    constructor() {
        this.tabs = [DEFAULT_TITLE];
    }

    //default parameters
    addNewTab(title = {title: 'Tab', active: 'true'}) {
        //arrow for each
        this.tabs.forEach(x => x.active = false);
        this.tabs.splice(this.tabs.length, 0, title);
    }

    removeTab(event, index) {
        event.preventDefault();
        event.stopPropagation();
        if (this.tabs.length === 1) {
            return;
        } else {
            this.tabs.splice(index, 1);
        }
    }

}

ang.module('tabsModule', ['Bootstrap', 'ui.bootstrap']).
        directive('tabElement', () => new TabElement).
        controller('tabController', () => new TabController);
