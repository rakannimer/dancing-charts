var React = require("react");
var Chart = require("./Chart");
var SpreadSheet = require("./SpreadSheet");
var ChartOptions = require("./ChartOptions");
var Button = require("react-bootstrap").Button;
var Input = require("react-bootstrap").Input;
var q = require("q");
var classnames = require("classnames");

var DancingSpreadsheets = React.createClass({
	interval_id: -1,
	simulation_data: null,
	current_row: 1,

	spreadsheet: null,

	getInitialState: function() {
		return {
			spreadsheet_url:
				"https://docs.google.com/spreadsheets/d/1flW5Ngyoqepe_W1FkqO6PGWQYRRU00lA3onCQBU51aY/pubhtml",
			spreadsheet_loaded: false,
			data: [],
			loaded: false,
			options: ChartOptions,
			delta_t: 200,
			height_multiplier: 1
		};
	},
	componentDidMount: function() {
		var self = this;
		this.fetch_data().then(function(data) {
			self.setState({
				data: data.data,
				options: data.options,
				spreadsheet_loaded: true,
				loaded: true
			});
			//self.start_animation();
		});
	},

	fetch_data: function() {
		var self = this,
			data_sheet = null,
			options_sheet = null;

		//The data can be fetched from anywhere
		this.spreadsheet = new SpreadSheet(this.state.spreadsheet_url);
		return this.spreadsheet.fetch().then(function(sheets) {
			data_sheet = sheets.data;
			options_sheet = sheets.options;

			var data = [];

			data.push(data_sheet.columns);
			data.push(data_sheet.rows[self.current_row]);
			self.current_row++;
			var colors = self.get_colors.call(this, options_sheet);

			var options = self.state.options;
			options.colors = colors;
			return {
				data: data,
				options: options
			};
		});
	},

	start_animation: function() {
		var self = this;

		this.interval_id = setInterval(function() {
			var data = self.state.data;
			data[1] = self.spreadsheet.data_sheet.rows[self.current_row];
			self.setState({
				data: data
			});
			self.current_row++;
			if (self.current_row === self.spreadsheet.data_sheet.rows.length - 1) {
				window.clearInterval(self.interval_id);
			}
		}, self.state.delta_t);
	},

	get_colors: function(options_sheet) {
		var colors = [];
		if (options_sheet) {
			var columns = options_sheet.columns;
			var rows = options_sheet.rows;
			for (var i = 0; i < rows.length; i++) {
				for (var j = 1; j < columns.length; j++) {
					colors.push(rows[i][j]);
				}
			}
		} else {
			colors.push("red");
		}
		return colors;
	},

	update_spreadsheet: function() {
		var new_spreadsheet_url = this.refs.spreadsheet_url.getDOMNode().value;
		if (new_spreadsheet_url !== "") {
			this.setState({
				spreadsheet_loaded: false,
				spreadsheet_url: new_spreadsheet_url
			});
			var self = this;
			this.fetch_data().then(function(data) {
				self.setState({
					data: data.data,
					options: data.options,
					spreadsheet_loaded: true
				});
			});
		}
	},

	stop_animation: function() {
		window.clearInterval(this.interval_id);
	},
	reset_animation: function() {
		var data = this.state.data;
		window.clearInterval(this.interval_id);
		this.current_row = 1;
		data[1] = this.spreadsheet.data_sheet.rows[this.current_row];
		this.setState({
			data: data
		});
		//this.start_animation();
	},
	change_delta_t: function(e) {
		var delta_t = e.target.value;
		if (delta_t === "") return;
		this.setState({
			delta_t: delta_t
		});
	},
	change_height_multiplier: function(e) {
		var height_multiplier = e.target.value;
		if (height_multiplier === "") return;
		var data = this.state.data;
		var row = [];
		for (var i = 0; i < this.spreadsheet.data_sheet.rows.length; i++) {
			row = this.spreadsheet.data_sheet.original_rows[i];
			for (var j = 0; j < row.length; j++) {
				this.spreadsheet.data_sheet.rows[i][j] =
					this.spreadsheet.data_sheet.original_rows[i][j] * height_multiplier;
			}
		}

		data[1] = this.spreadsheet.data_sheet.rows[this.current_row - 1];
		this.setState({
			height_multiplier: height_multiplier,
			data: data
		});
	},
	render: function() {
		var loaderClass = classnames({ hide: this.state.loaded });
		return (
			<div>
				<div className={"row"}>
					<div className={" col-lg-2 buttonContainer"}>
						<div className={""}>
							<div>
								<label htmlFor="delta_t">Interval Length (ms) </label>
								<input
									className="form-control small"
									type="text"
									id="delta_t"
									ref="delta_t"
									defaultValue={this.state.delta_t}
									placeholder="Height Multiplier"
									label="Height Multiplier"
									onChange={this.change_delta_t}
								/>
								<label htmlFor="height_multiplier">Height Multiplier </label>
								<input
									className="form-control small"
									type="text"
									ref="height_multipler"
									id="height_multiplier"
									defaultValue={this.state.height_multiplier}
									placeholder="Height Multiplier"
									label="Height Multiplier"
									onChange={this.change_height_multiplier}
								/>
							</div>

							<div>
								<div style={{ marginTop: "10px" }}>
									<a href={this.state.spreadsheet_url} target="_blank">
										Edit Spreadsheet Values
									</a>
								</div>

								<Input
									className="form-control"
									type="text"
									ref="spreadsheet_url"
									id="spreadsheet_url"
									defaultValue={this.state.spreadsheet_url}
									placeholder="SpreadSheet Url"
									label="SpreadSheet Url"
									bsSize="small"
								/>
								<Button
									onClick={this.update_spreadsheet}
									style={{ marginTop: "10px" }}
								>
									{" "}
									Load{" "}
								</Button>
							</div>
						</div>
					</div>

					<Chart
						data={this.state.data}
						options={this.state.options}
						loaded={this.state.spreadsheet_loaded}
					/>
				</div>

				<div className={"row controls"}>
					<Button onClick={this.start_animation}> Start </Button>
					<Button onClick={this.stop_animation}> Stop </Button>
					<Button onClick={this.reset_animation}> Reset </Button>
				</div>
			</div>
		);
	}
});

module.exports = DancingSpreadsheets;
