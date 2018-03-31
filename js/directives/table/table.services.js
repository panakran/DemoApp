var ang = require("angular");
ang.module('tableModule').
        factory('table', table);

function table() {
    return {
        removeItem: removeItem,
        addItem: addItem
    };
    function addItem(tableModel) {
        tableModel.push({item: "New", amount: 0});

    }
    function removeItem(index, tableModel) {
        if (tableModel.length === 1) {
            return;
        } else {
            tableModel.splice(index, 1);
        }
    }
}
