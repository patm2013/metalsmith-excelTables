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
  return function(files, metalsmith, done) {
    var filenames = Object.keys(files);
    var alldone = (function (){
        var count = 0;

        return function alldone(response) {
          if (++count >= filenames.length) {
            done();
          }
        };
    })();

    for (var file in files) {
      var tbl = files[file].table,
        select = files[file].select,
        additional = files[file].additional,
        contents = files[file].contents;
        console.log(contents.toString());
      if (tbl !== undefined) {
          alasql(makeQry(tbl, select, additional),
          [],function(data){
            var strTbl = makeArray(data);
            var strTmp = contents.toString();
            console.log(strTmp);
            strTmp += "\n\n" + strTbl;
            console.log(strTmp);
            console.log(contents);
            contents = new Buffer(strTmp);
            alldone();
          });
          console.log("A");
      } else {
        alldone();
      } 


    }



  };
};