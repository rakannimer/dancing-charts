var ChartOptions = {
	vAxis: {
		baselineColor: '#607D8B',
		viewWindowMode:'explicit',
		viewWindow: {
			max:30,
			min:0
		},
		gridlines: {
			color: 'transparent'
		},
		textPosition: 'none'
	},
	hAxis: {
		baselineColor: 'transparent',

		gridlines: {
			color: 'transparent'
		},
		textPosition: 'none'

	},
	legend: {
		position: 'none'
	},
	backgroundColor: 'transparent',
	
	chartArea: {'width': '100%', 'height': '100%'},
};
module.exports = ChartOptions;