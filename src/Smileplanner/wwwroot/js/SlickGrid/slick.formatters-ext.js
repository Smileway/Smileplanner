/***
 * Contains basic SlickGrid formatters.
 * 
 * NOTE:  These are merely examples.  You will most likely need to implement something more
 *        robust/extensible/localizable/etc. for your use!
 * 
 * @module Formatters
 * @namespace Slick
 */

(function ($) {

    function SelectFormatter(row, cell, value, columnDef, dataContext) {
        return columnDef.options[value];
    }

    function PriorityStatusFormatter(row, cell, value, columnDef, dataContext) {
        return "<img src='../images/"+value+".svg' width='15px'>";
    }

    
    function TaskNameFormatter(row, cell, value, columnDef, dataContext) {
        value = value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        var spacer = "<span style='display:inline-block;height:1px;width:" + (15 * dataContext["indent"]) + "px'></span>";
        var idx = dataView.getIdxById(dataContext.id);
        if (data[idx + 1] && data[idx + 1].indent > data[idx].indent) {
            if (dataContext._collapsed) {
                return spacer + " <span class='toggle expand'></span>&nbsp;" + value;
            } else {
                return spacer + " <span class='toggle collapse'></span>&nbsp;" + value;
            }
        } else {
            return spacer + " <span class='toggle'></span>&nbsp;" + value;
        }
    };

    Slick.Formatters.Select = SelectFormatter;
    Slick.Formatters.PriorityStatus = PriorityStatusFormatter;
    Slick.Formatters.TaskName = TaskNameFormatter;
})(jQuery);
