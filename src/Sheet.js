var Sheet = function(tabletop_model) {
	this.original_rows = tabletop_model.toArray();
	this.rows = tabletop_model.toArray();
	this.columns = tabletop_model.column_names;

};
module.exports = Sheet;