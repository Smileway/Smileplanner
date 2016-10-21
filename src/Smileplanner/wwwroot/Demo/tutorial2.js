// tutorial2.js
var CommentList = React.createClass({
  render: function() {
    return (
      <div className="commentList">
        Hello, world! I am a CommentList.
      </div>
    );
  }
});

ReactDOM.render(
  React.createElement(CommentList, null),
  document.getElementById('content')
);
var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});


ReactDOM.render(
  React.createElement(CommentForm, null),
  document.getElementById('content')
);