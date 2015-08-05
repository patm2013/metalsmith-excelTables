var Metalsmith = require('metalsmith'),
	table = require('markdown-table'),
	alasql = require('alasql'),
	exl = require("./module.js");

Metalsmith(__dirname)
    .destination('./build')
    .use(exl.excelTables())
    .build(function(err) {
      if (err) { throw err; }
    });