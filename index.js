var Metalsmith = require('metalsmith');
var table = require('markdown-table');
var alasql = require('alasql');
var each = require('metalsmith-each');

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

Metalsmith(__dirname)
    .destination('./build')
    .use(
      each(function (file, filename, done) {
        if (typeof file.table === "string"){
            alasql(makeQry(file.table, file.select, file.additional),
                  [],function(data){
                  strTbl = makeArray(data);
                  strTmp = file.contents.toString();
                  strTmp += "\n" + strTbl;
                  file.contents = new Buffer(strTmp);
                  done();
              });
          } else {
            done();
          }
      })
    )
    .build(function(err) {
      if (err) { throw err; }
    });