var mysql = require('mysql');


var pool = mysql.createPool({
    connectionLimit: 100,
    host: "us-cdbr-iron-east-03.cleardb.net",
    user: "bf3507d156a390",
    password: "eaf0f65b",
    database: "heroku_6cbd6dcc8b88f6a",
    debug: false
});
var utilities = {}
utilities.getConnection = function(callback) {
    console.log("Environment variable");
    console.log(pool)
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

                response.data = JSON.parse(JSON.stringify(result))
                if (result.length == 0) {
                    response.message = "No users";
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