function requiredFieldValidator(value) {
    if (value == null || value == undefined || !value.length) {
        return { valid: false, msg: "This is a required field" };
    } else {
        return { valid: true, msg: null };
    }
}
var dataView;
var grid;
var data = [];
var columns = [];
var columnsWithHighlightingById = {};

var status_options = {
    "TD": "To Do",
    "IP": "In Progress",
    "IR": "In Review"
};
var type_options = {
    "RM": "Roadmap",
    "US": "User Stories",
    "T": "Task",
    "B": "Bug"
};

var priority_options = { "L": "Low", "M": "Medium", "H": "High" };
var resource_options = {
    "HN": "Huy Nguyen",
    "TQ": "Tran Quan",
    "TQ2": "Tran Quan 2",
    "TQ3": "Tran Quan 4",
    "TQ4": "Tran Quan 5",
    "TQ5": "Tran Quan 6"
};
var columns = [
    { id: "sel", name: "#", field: "num", behavior: "select", cssClass: "cell-selection", width: 40, cannotTriggerInsert: true, resizable: false, selectable: false },
    { id: "title", name: "Title", field: "title", width: 220, cssClass: "cell-title", formatter: Slick.Formatters.TaskName, editor: Slick.Editors.Text, validator: requiredFieldValidator },
    { id: "type", name: "Type", field: "type", minWidth: 80, editor: Slick.Editors.Select, options: type_options },
    { id: "priority", name: "Priority", field: "priority", width: 60, selectable: false, resizable: false, formatter: Slick.Formatters.PriorityStatus},
    { id: "duration", name: "Duration", field: "duration", editor: Slick.Editors.Text },
    { id: "%", name: "% Complete", field: "percentComplete", width: 80, resizable: false, formatter: Slick.Formatters.PercentCompleteBar, editor: Slick.Editors.PercentComplete },
    { id: "start", name: "Start", field: "start", minWidth: 60, editor: Slick.Editors.Date },
    { id: "finish", name: "Finish", field: "finish", minWidth: 60, editor: Slick.Editors.Date },
    { id: "status", name: "Status", field: "status", minWidth: 80, editor: Slick.Editors.Select, options: status_options },
    { id: "pic", name: "PIC", field: "pic", minWidth: 80, editor: Slick.Editors.Selects, options: resource_options },
    { id: "done", name: "Is Done?", width: 80, minWidth: 20, maxWidth: 80, cssClass: "cell-effort-driven", field: "effortDriven", formatter: Slick.Formatters.Checkmark, editor: Slick.Editors.Checkbox, cannotTriggerInsert: true },
    { id: "desc", name: "Description", field: "description", width: 200, editor: Slick.Editors.LongText },
    { id: "comment", name: "Comment", field: "comment", width: 200, editor: Slick.Editors.LongText },
    { id: "roadmap", name: "Roadmap", field: "roadmap", minWidth: 80 }
];
var options = {
    editable: true,
    enableAddRow: true,
    enableCellNavigation: true,
    asyncEditorLoading: true,
    forceFitColumns: false,
    topPanelHeight: 25
};
var percentCompleteThreshold = 0;
var searchString = "";
function myFilter(item) {
    if (item["percentComplete"] < percentCompleteThreshold) {
        return false;
    }
    if (searchString != "" && item["title"].indexOf(searchString) == -1) {
        return false;
    }
    if (item.parent != null) {
        var parent = data[item.parent];
        while (parent) {
            if (parent._collapsed || (parent["percentComplete"] < percentCompleteThreshold) || (searchString != "" && parent["title"].indexOf(searchString) == -1)) {
                return false;
            }
            parent = data[parent.parent];
        }
    }
    return true;
}
function percentCompleteSort(a, b) {
    return a["percentComplete"] - b["percentComplete"];
}
function AddNewRow() {
    dataView.addItem({id: "12345", title: "secKey", parent:"id_1", indent:1});
    grid.invalidate();
    dataView.refresh();
}
$(function () {
    var indent = 0;
    var parents = [];
    
    // prepare the data
    for (var i = 0; i < 50; i++) {
        var d = (data[i] = {});
        var parent;
        if (Math.random() > 0.8 && i > 0) {
            indent++;
            parents.push(i - 1);
        } else if (Math.random() < 0.3 && indent > 0) {
            indent--;
            parents.pop();
        }

        if (parents.length > 0) {
            parent = parents[parents.length - 1];
        } else {
            parent = null;
        }
        d["id"] = "id_" + i;
        d["num"] = i;
        d["indent"] = indent;
        d["parent"] = parent;
        d["title"] = "Task " + i;
        d["duration"] = "5 days";
        d["percentComplete"] = Math.round(Math.random() * 100);
        d["start"] = "01/01/2009";
        d["finish"] = "01/05/2009";
        d["priority"] = "L";
        //d["pic"];
        
        d["effortDriven"] = (i % 5 == 0);
    }

    columns[1].header = {
        buttons: [
        {
            image: "../images/help.png",
            showOnHover: true,
            tooltip: "This button only appears on hover.",
            handler: function(e) {
            alert('Help');
            }
        }
        ]
    };
    // initialize the model
    dataView = new Slick.Data.DataView({ inlineFilters: true });
    dataView.beginUpdate();
    dataView.setItems(data);
    dataView.setFilter(myFilter);
    dataView.endUpdate();
    // initialize the grid
    grid = new Slick.Grid("#myGrid", dataView, columns, options);

    var GanttColumnPlugin = new Slick.Plugins.GanttColumn();
    GanttColumnPlugin.handleSelectedRowsChanged = true;
    grid.registerPlugin( GanttColumnPlugin );

    var pager = new Slick.Controls.Pager(dataView, grid, $("#pager"));

    grid.onCellChange.subscribe(function (e, args) {
        dataView.updateItem(args.item.id, args.item);
    });

    grid.onAddNewRow.subscribe(function (e, args) {
        var item = {
            "id": "new_" + (Math.round(Math.random() * 10000)),
            "indent": 0,
            "title": "New task",
            "duration": "1 day",
            "percentComplete": 0,
            "start": "01/01/2009",
            "finish": "01/01/2009",
            "effortDriven": false
        };
        $.extend(item, args.item);
        dataView.addItem(item);
    });

    // grid.onClick.subscribe(function (e, args) {
    //     var cell = grid.getCellFromEvent(e);
    //     if (grid.getColumns()[cell.cell].id == "priority") {
    //         if (!grid.getEditorLock().commitCurrentEdit()) {
    //         return;
    //         }
    //         //data[cell.row].priority = priority_options[data[cell.row].priority];
    //         switch (data[cell.row].priority) {
    //             default:
    //             case "Low":
    //                 data[cell.row].priority = "Medium";
    //             break;
    //             case "Medium":
    //                 data[cell.row].priority = "High";
    //             break;
    //             case "High":
    //                 data[cell.row].priority = "Low";
    //             break;
    //         }
    //         grid.updateRow(cell.row);
    //         e.stopPropagation();
    //     }

    //     if ($(e.target).hasClass("toggle")) {
    //         var item = dataView.getItem(args.row);
    //         if (item) {
    //             if (!item._collapsed) {
    //                 item._collapsed = true;
    //             } else {
    //                 item._collapsed = false;
    //             }
    //             dataView.updateItem(item.id, item);
    //         }
    //         e.stopImmediatePropagation();
    //     }
    // });

    grid.onClick.subscribe(function (e, args) { // onDblClick
        var cell = grid.getCellFromEvent(e);
        if (grid.getColumns()[cell.cell].id == "priority") {
            if (!grid.getEditorLock().commitCurrentEdit()) {
            return;
            }
            //data[cell.row].priority = priority_options[data[cell.row].priority];
            switch (data[cell.row].priority) {
                default:
                case "L":
                    data[cell.row].priority = "M";
                break;
                case "M":
                    data[cell.row].priority = "H";
                break;
                case "H":
                    data[cell.row].priority = "L";
                break;
            }
            grid.updateRow(cell.row);
            e.stopPropagation();
        }

        if ($(e.target).hasClass("toggle")) {
            var item = dataView.getItem(args.row);
            if (item) {
                if (!item._collapsed) {
                    item._collapsed = true;
                } else {
                    item._collapsed = false;
                }
                dataView.updateItem(item.id, item);
            }
            e.stopImmediatePropagation();
        }
    });

    // wire up model events to drive the grid
    dataView.onRowCountChanged.subscribe(function (e, args) {
        grid.updateRowCount();
        grid.render();
    });
    dataView.onRowsChanged.subscribe(function (e, args) {
        grid.invalidateRows(args.rows);
        grid.render();
    });
    var h_runfilters = null;
    // wire up the slider to apply the filter to the model
    /*$("#pcSlider").slider({
      "range": "min",
      "slide": function (event, ui) {
        Slick.GlobalEditorLock.cancelCurrentEdit();
        if (percentCompleteThreshold != ui.value) {
          window.clearTimeout(h_runfilters);
          h_runfilters = window.setTimeout(dataView.refresh, 10);
          percentCompleteThreshold = ui.value;
        }
      }
    });*/
    // wire up the search textbox to apply the filter to the model
    $("#txtSearch").keyup(function (e) {
        Slick.GlobalEditorLock.cancelCurrentEdit();
        // clear on Esc
        if (e.which == 27) {
            this.value = "";
        }
        searchString = this.value;
        dataView.refresh();
    })
})



