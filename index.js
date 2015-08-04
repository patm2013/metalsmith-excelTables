var Metalsmith = require('metalsmith');
var table = require('markdown-table');
var alasql = require('alasql');
var exl = require("./module.js")

Metalsmith(__dirname)
    .destination('./build')
    .use(exl.excelTables())
    .build(function(err) {
      if (err) { throw err; }
    });