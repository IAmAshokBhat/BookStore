var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: "root",
    password: "",
    database: "book_store",
    debug: false
});
var getConnection = function(callback) {
    pool.getConnection(function(err, connection) {
        callback(err, connection);
    });
};
// DB.createConnection = function() {
//     console.log("Creating Connection")
//     DB.con = mysql.createConnection({
//         host: process.env.DB_URL,
//         user: process.env.DB_USER_NAME,
//         password: "",
//         database: process.env.DATABASE_NAME
//     });
// };

// DB.connect = function() {
//     DB.createConnection().then(function() {
//         console.log("Trying to Connect")
//         DB.con.connect(function(err) {

//             if (err) {
//                 console.log(err)
//                 return err;
//             }
//             console.log("Connected");
//             return true;
//         });
//     })

// };

module.exports = getConnection;