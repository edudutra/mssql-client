var mssql = require('mssql');
var sql = require('sql');  

var config = {
    user: 'boletim',
    password: 'bolet!m',
    server: 'mssql2.gear.host', // You can use 'localhost\\instance' to connect to named instance
    database: 'boletim',

    // options: {
    //     encrypt: true // Use this if you're on Windows Azure
    // }
}
  
var testeConfig = JSON.parse('{"user": "boletim", "password": "bolet!m", "server": "mssql2.gear.host", "database": "boletim"}');


sql.setDialect('mssql');
var columns = sql.define({
	name: 'columns',
	schema: 'information_schema',
	columns: [
		{ name: 'table_schema', property: 'tableSchema' },
		{ name: 'table_name', property: 'tableName' },
		{ name: 'table_catalog', property: 'tableCatalog' },
		{ name: 'column_name', property: 'name' },
		{ name: 'ordinal_position', property: 'ordinalPosition' },
		{ name: 'data_type', property: 'type' },
		{ name: 'character_maximum_length', property: 'charLength' },
		{ name: 'column_default', property: 'defaultValue' },
		{ name: 'is_nullable', property: 'isNullable' }
	]
});
var tables = sql.define({
	name: 'tables',
	schema: 'information_schema',
	columns: [
		{ name: 'table_name', property: 'name' },
		{ name: 'table_schema', property: 'schema' },
		{ name: 'table_catalog', property: 'catalog' },
		{ name: 'table_type', property: 'type' }
	]
});

var queryTables = tables
	.select(tables.name.as('name'))
	.from(tables)
    .where(tables.schema.equals('dbo'))
	.and(tables.catalog.equals('boletim'))
	.and(tables.type.equals('BASE TABLE'))
    .and(tables.name.notEquals('sysdiagrams'))
    .toQuery();
    


var conn = new mssql.Connection(testeConfig);

conn.connect(
    function(err) {

    var req = conn.request();
    
    //var parametros = [1, 2015];
    
    queryTables.values.map( function(e, rank) { // magic 
        req.input(rank+1, e);     
    });
    

    req.query(queryTables.text, function(err, recordset) {
    
        console.log(recordset); // return 1
        
        console.log('Iniciando a varredura de tabelas\n\n');
        
            recordset.forEach(function(table) {
                
                
                
                var queryColumns = columns
        			.select(
        				columns.name.as('name'),
        				columns.isNullable.as('nullable'),
        				columns.defaultValue.as('default_value'),
        				columns.type.as('type')
        			)
        			.from(columns)
        			.where(columns.tableName.equals(table.name))    
                    .and(columns.tableSchema.equals('dbo'))
					.and(columns.tableCatalog.equals('boletim'))
                    .toQuery();
                 
                 //console.log(queryColumns);
                
                 var reqCol = conn.request();
                 
                queryColumns.values.map( function(e, rank) { // magic 
                    reqCol.input(rank+1, e);     
                }); 
                
                reqCol.query(queryColumns.text, function(err, recordset) {
                    console.log('Tabela: ' + table.name + '\n');
                    
                    console.log(recordset); 
                });
                 
            }, this);
             
            conn.close();
    
    
    });
    
    //
});



// client.query(query.text, query.values, function(err, result) {
// 					callback(err, result && result.rows);
// 				});
// 
// sql.connect(testeConfig, function(err) {
//     // ... error checks
// 
//     // Query
// 
//     var request = new sql.Request();
//     request.query('select 1 as number', function(err, recordset) {
//         // ... error checks
// 
//         console.dir(recordset);
//     });
// 
//     // Stored Procedure
// 
// //     var request = new sql.Request();
// //     request.input('input_parameter', sql.Int, value);
// //     request.output('output_parameter', sql.VarChar(50));
// //     request.execute('procedure_name', function(err, recordsets, returnValue) {
// //         // ... error checks
// // 
// //         console.dir(recordsets);
// //     });
// 
// });
// 
// var connection = new sql.Connection(config, function(err) {
//     // ... error checks
// 
//     // Query
// 
//     var request = new sql.Request(connection); // or: var request = connection.request();
//     request.query('select * from Rede', function(err, recordset) {
//         // ... error checks
// 
//         console.dir(recordset);
//         console.log(err);
//     });
// 
// //     // Stored Procedure
// // 
// //     var request = new sql.Request(connection);
// //     request.input('input_parameter', sql.Int, 10);
// //     request.output('output_parameter', sql.VarChar(50));
// //     request.execute('procedure_name', function(err, recordsets, returnValue) {
// //         // ... error checks
// // 
// //         console.dir(recordsets);
// //     });
// 
// });
// 
// var request = new sql.Request(connection); // or: var request = connection.request();
//     request.query('select * from Rede', function(err, recordset) {
//         // ... error checks
// 
//         console.dir(recordset);
//         console.log(err);
//     });
// 
// sql.connect(config, function(err) {
//     // ... error checks
// 
//     // Query
// 
//     var request = new sql.Request();
//     request.query('select 1 as number', function(err, recordset) {
//         // ... error checks
// 
//         console.dir(recordset);
//     });
// 
//     // Stored Procedure
// 
// //     var request = new sql.Request();
// //     request.input('input_parameter', sql.Int, value);
// //     request.output('output_parameter', sql.VarChar(50));
// //     request.execute('procedure_name', function(err, recordsets, returnValue) {
// //         // ... error checks
// // 
// //         console.dir(recordsets);
// //     });
// 
// });
