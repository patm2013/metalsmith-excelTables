var excelTables = function(config) {
	return function (file, filename, done) {
        if (typeof file.table === "string"){
        	for (var i = 0; i < files.length; i++) {
        		console.log(files[i].filename)
        	};
            /*alasql(makeQry(file.table, file.select, file.additional),
          		[],function(data){
          		strTbl = makeArray(data);
	          	strTmp = file.contents.toString();
	          	strTmp += "\n" + strTbl;
	          	file.contents = new Buffer(strTmp);
	          	done();
          	});*/
		}
		done();
  	};
};