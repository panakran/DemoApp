var ang = require("angular");
ang.module('tableModule').
        factory('table', table);

function table() {
    let addItem = (tableModel) => tableModel.push({item: "New", amount: 0});
    let removeItem = (index, tableModel) => {
        if (tableModel.length === 1) {
            return;
        } else {
            tableModel.splice(index, 1);
        }
    };

    return {
        removeItem: removeItem,
        addItem: addItem
    };
}
