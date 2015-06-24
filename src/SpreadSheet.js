var React = require('react');
var Tabletop = require('tabletop');
var Q = require('q');
var Sheet = require('./Sheet');

var SpreadSheet = function(url) {
  this.table_top = null;
  this.spreadsheet_url = url;
  this.data_sheet = null;
  this.options_sheet= null;
};

SpreadSheet.prototype.fetch = function(){
  var self = this;
  var deferred = Q.defer();
  this .table_top = Tabletop.init({
    key: this.spreadsheet_url,
    parseNumbers: true,
    callback: function(data) {
      var sheets = data,
            sheet_names = Object.keys(self.table_top.sheets()),
            data_sheet = null,
            options_sheet = null;
      try {
        self.data_sheet = new Sheet(sheets['Data']);
      } catch(e) {
        deferred.reject("Spreadsheet doesn't contain Data sheet : ", e);
      }
      
      // it's ok if it's not defined don't throw an exception
      if (typeof sheets['Options'] !== 'undefined') {
        self.options_sheet = new Sheet(sheets['Options']);
      }
      
      var parsed_sheets = {
        data: self.data_sheet,
        options : self.options_sheet
      }

      deferred.resolve(parsed_sheets);

    }
  });
  return deferred.promise;
};

SpreadSheet.prototype.log = function(message) {
  console.log(message);
} ;

module.exports = SpreadSheet;

