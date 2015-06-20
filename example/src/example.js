var React = require('react');
var DancingSpreadsheets = require('react-dancing-spreadsheets');

var App = React.createClass({
	render () {
		return (
			<div>
				<DancingSpreadsheets />
			</div>
		);
	}
});

React.render(<App />, document.getElementById('app'));
