/***
 * Contains basic SlickGrid editors.
 * @module Editors
 * @namespace Slick
 */

(function ($) {

    function SelectEditor(args) {
        var $select;
        var defaultValue;
        var scope = this;

        this.init = function () {
            var option_str = "";
            for (key in args.column.options) {
                option_str += "<OPTION value='" + key + "'>" + args.column.options[key] + "</OPTION>";
            }
            $select = $("<SELECT tabIndex='0' class='editor-select'>" + option_str + "</SELECT>");
            $select.appendTo(args.container);
            $select.focus();
        };

        this.destroy = function () {
            $select.remove();
        };

        this.focus = function () {
            $select.focus();
        };

        this.loadValue = function (item) {
            defaultValue = item[args.column.field];
            $select.val(defaultValue);
        };

        this.serializeValue = function () {
            return $select.val();
        };

        this.applyValue = function (item, state) {
            item[args.column.field] = state;
        };

        this.isValueChanged = function () {
            return ($select.val() != defaultValue);
        };

        this.validate = function () {
            return {
                valid: true,
                msg: null
            };
        };

        this.init();
    }

    function SelectsEditor(args) {
        var $select;
        var defaultValue;
        var scope = this;

        this.init = function () {
            var option_str = "";
            for (key in args.column.options) {
                option_str += "<OPTION value='" + key + "'>" + args.column.options[key] + "</OPTION>";
            }
            $select = $("<SELECT tabIndex='0' class='editor-select' multiple='multiple'>" + option_str + "</SELECT>");
            $select.appendTo(args.container);
            $select.focus();
        };

        this.destroy = function () {
            $select.remove();
        };

        this.focus = function () {
            $select.focus();
        };

        this.loadValue = function (item) {
            defaultValue = item[args.column.field];
            $select.val(defaultValue);
        };

        this.serializeValue = function () {
            return $select.val();
        };

        this.applyValue = function (item, state) {
            item[args.column.field] = state;
        };

        this.isValueChanged = function () {
            return ($select.val() != defaultValue);
        };

        this.validate = function () {
            return {
                valid: true,
                msg: null
            };
        };

        this.init();
    }

    function SelectFormatter(row, cell, value, columnDef, dataContext) {
        return columnDef.options[value];
    }

    // function PickListEditor(args) {

    //     var $select;
    //     var defaultValue;
    //     var scope = this;

    //     this.init = function () {
    //         console.log("PickListEditor...  SelectValues");
    //         console.log(args.column.columnSelectItems);
    //         option_str = ""
    //         var length = args.column.columnSelectItems.length;
    //         for (var i = 0; i < length; i++) {
    //             var selectOption = args.column.columnSelectItems[i];
    //             if (selectOption["disable"] == true) disable = "disable";
    //             option_str += "<OPTION value='" + selectOption["stringValue"] + "'>" + selectOption["label"] + "</OPTION>";
    //         }
    //         $select = $("<select tabIndex='0' multiple='multiple'>" + option_str + "</select>");
    //         console.log(args.container);
    //         $select.appendTo(args.container);
    //         $(args.container).append($select[0]);
    //         console.log($select);
    //         console.log($select[0]);
    //         $select.focus();
    //     };

    //     this.destroy = function () {
    //         $select.remove();
    //     };

    //     this.focus = function () {
    //         $select.focus();
    //     };

    //     this.loadValue = function (item) {
    //         console.log("loaded Item  : ");
    //         console.log(item);
    //         defaultValue = item[args.column.field];
    //         $select.val(defaultValue);
    //     };

    //     this.serializeValue = function () {
    //         if (args.column.columnSelectItems) {
    //             return $select.val();
    //         } else {
    //             return "";
    //         }
    //     };

    //     this.applyValue = function (item, state) {
    //         item[args.column.field] = state;
    //     };

    //     this.isValueChanged = function () {
    //         return ($select.val() != defaultValue);
    //     };

    //     this.validate = function () {
    //         return {
    //             valid: true,
    //             msg: null
    //         };
    //     };

    //     this.init();
    // }

    Slick.Editors.Select = SelectEditor;
    Slick.Editors.Selects = SelectsEditor;
    // Slick.Editors.PickList = PickListEditor;

    Slick.Formatters.Select = SelectFormatter;

})(jQuery);
