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
            $select = $("<SELECT tabIndex='0' class='editor-select' style='min-width: 100px;'>" + option_str + "</SELECT>");
            // var btn = $("<button class=\"btn btn-mini\" >done</button>");
            // btn.click(function() {
            //     args.grid.getEditController().commitCurrentEdit();
            // });
            
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
            $select = $("<SELECT tabIndex='0' class='editor-select' multiple='multiple' style='min-width: 100px;'>" + option_str + "</SELECT>");
            $select.children("OPTION").mousedown(function(e) {
                e.preventDefault();
                $(this).prop('selected', $(this).prop('selected') ? false : true);
                return false;
            });
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


    Slick.Editors.Select = SelectEditor;
    Slick.Editors.Selects = SelectsEditor;


})(jQuery);
