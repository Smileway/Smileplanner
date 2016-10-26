
	var DropDownEditor = function (_EditorBase) {
	  _inherits(DropDownEditor, _EditorBase);

	  function DropDownEditor() {
	    _classCallCheck(this, DropDownEditor);

	    return _possibleConstructorReturn(this, _EditorBase.apply(this, arguments));
	  }

	  DropDownEditor.prototype.getInputNode = function getInputNode() {
	    return _reactDom2['default'].findDOMNode(this);
	  };

	  DropDownEditor.prototype.onClick = function onClick() {
	    this.getInputNode().focus();
	  };

	  DropDownEditor.prototype.onDoubleClick = function onDoubleClick() {
	    this.getInputNode().focus();
	  };

	  DropDownEditor.prototype.render = function render() {
	    return React.createElement(
	      'select',
	      { style: this.getStyle(), defaultValue: this.props.value, onBlur: this.props.onBlur, onChange: this.onChange },
	      this.renderOptions()
	    );
	  };

	  DropDownEditor.prototype.renderOptions = function renderOptions() {
	    var options = [];
	    this.props.options.forEach(function (name) {
	      if (typeof name === 'string') {
	        options.push(React.createElement(
	          'option',
	          { key: name, value: name },
	          name
	        ));
	      } else {
	        options.push(React.createElement(
	          'option',
	          { key: name.id, value: name.value, title: name.title },
	          name.text || name.value
	        ));
	      }
	    }, this);
	    return options;
	  };

	  return DropDownEditor;
	}(EditorBase);

	DropDownEditor.propTypes = {
	  options: React.PropTypes.arrayOf(React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.objectOf({
	    id: React.PropTypes.string,
	    title: React.PropTypes.string,
	    value: React.PropTypes.string,
	    text: React.PropTypes.string
	  })])).isRequired
	};

	module.exports = DropDownEditor;