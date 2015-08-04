var exports = module.exports = {};

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
    for (var file in files) {
      if (files[file].table !== undefined) {
        console.log(files[file].table);
      };
    }
    done();
  };
};