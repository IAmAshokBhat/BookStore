var mysql = require('mysql');


var pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.HEROKU_DB_URL || "us-cdbr-iron-east-03.cleardb.net",
    user: process.env.HEROKU_DB_USER_NAME || "bf3507d156a390",
    password: process.env.HEROKU_DB_PASSWORD || "eaf0f65b",
    database: process.env.HEROKU_DBNAME || "heroku_6cbd6dcc8b88f6a",
    debug: false
});
var utilities = {}
utilities.getConnection = function(callback) {

    pool.getConnection(function(err, connection) {
        callback(err, connection);
    });
};


utilities.executeQuery = function(query) {
    return new Promise(function(resolve, reject) {
        utilities.getConnection(function(err, connection) {
            var data = [];
            var response = { data: [], status: 1, message: "" }
            connection.query(query, function(err, result, fields) {
                if (err) {
                    console.log(err)
                    reject(err)
                }
                console.log(JSON.parse(JSON.stringify(result)));
                console.log(JSON.parse(JSON.stringify(process.env)));
                response.data = JSON.parse(JSON.stringify(result))
                if (result.length == 0) {
                    response.message = "No records";
                    response.status = 0;
                } else {
                    response.message = "Success";
                }
                resolve(response);
            });
            connection.release();
        });
    });

}


module.exports = utilities;