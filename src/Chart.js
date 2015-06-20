var React = require('react');
var GChart = require('react-google-charts').Chart;
var classnames = require('classnames');

var Chart = React.createClass({

getInitialState: function() {
	return {
		loaded: false 
	};
},
  getDefaultProps: function() {
  	return {
  		data: [],
  		options: [],
  		loaded : false
  	};
  },

  render: function() {

   var loaderClass = classnames({'hide':this.props.loaded});

    return (
      <div className="">
      	<div className = {"col-lg-10"} >
		<div className= {loaderClass}>
			<div >
				<h4 className={"spreadsheet-loading"}><span>Loading Spreadsheet ...</span> </h4>
			</div>
			<div className="boxLoading">
			</div>
		</div>
		
		<GChart width={"120%"} height={"400px"} chartType={"ColumnChart"} data = {this.props.data}  options= {this.props.options}  />
	</div>
      </div>
    );
  }
});

module.exports = Chart;