var table = require('markdown-table');
var path = require('path');
var alasql = require('alasql');
var exports = module.exports = {};
var _ = require('lodash');

var makeArray = function(objArray) {
  var tableArr = [];
  tableArr.push(_.keys(objArray[0]));

  _.each(objArray, function(obj){
    tableArr.push(_.values(obj));
  });
  return(table(tableArr));
};

function makeQry(tbl, select, additional){
  qry = 'SELECT ' + select + ' from xlsx("' + tbl + '",{headers:true})';
  if (typeof additional === "string") {
    qry += ' ' + additional;
  }
  return qry;
}

exports.excelTables = function(config) {
  config = _.defaults(config||{},{folder:"xlsx/"});

  return function(files, metalsmith, done) {
    var filenames = Object.keys(files);
    var alldone = (function (){
        var count = 0;
        return function alldone() {
          console.log(count);
          if (++count >= filenames.length) {
            done();
          }
        };
    })();

    var ala = function(file){
      var qry = makeQry(file.table, file.select, file.additional);
      alasql(qry,[],function(data){
        var strTbl = makeArray(data);
        file.contents += '\n\n' + strTbl;
        console.log(file.contents);
        alldone();
      });
    };

    filenames.forEach(function(filename){
      var file = files[filename];
      if (file.table) {
        console.log(file.table);
        ala(file);
      } else {
        alldone();      
      }
    });
  };
};