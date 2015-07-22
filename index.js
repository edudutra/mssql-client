var sql = require('mssql'); 

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

var conn = new sql.Connection(testeConfig);

conn.connect(
    function(err) {

    var req = conn.request();
    req.input('rede', 1);
    req.query('select * from Rede where IdRede = @rede', function(err, recordset) {
    
        console.log(recordset); // return 1
    
    });
    
    conn.close();
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
