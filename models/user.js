var createConnection = require('../utilities/database_connection');
var randomstring = require("randomstring");
var user = {};

/* Get all Users*/

user.getAllUsers = function() {
    return new Promise(function(resolve, reject) {
        createConnection(function(err, connection) {
            var data = [];
            connection.query("SELECT  `name`, `email` FROM `user`", function(err, result, fields) {
                if (err) {
                    console.log(err)
                    reject(err)
                }
                console.log(JSON.parse(JSON.stringify(result)));
                var response = { data: [], status: 1, message: "" }
                response.data = JSON.parse(JSON.stringify(result))
                if (result.length == 0) {
                    response.message = "No users";
                } else {
                    response.message = "Success";
                }
                resolve(response);
            });
            connection.release();
        });
    });
};

/* Get user matching id*/

user.getUserWithId = function(id) {
    return new Promise(function(resolve, reject) {
        createConnection(function(err, connection) {
            var data = [];
            connection.query("SELECT `name`, `email` FROM user where user_id=" + id, function(err, result, fields) {
                if (err) {
                    console.log(err)
                    reject(err)
                }
                console.log(JSON.parse(JSON.stringify(result)));
                var response = { data: [], status: 1, message: "" }
                response.data = JSON.parse(JSON.stringify(result))
                if (result.length == 0) {
                    response.message = "No such user";
                } else {
                    response.message = "Success";
                }
                resolve(response);
            });
            connection.release();
        });
    });
};

/* Get user matching name*/

user.getUserWithName = function(name) {
    return new Promise(function(resolve, reject) {
        createConnection(function(err, connection) {
            var data = [];
            console.log(name)
            var query = "SELECT `name`, `email` FROM user WHERE  name LIKE '" + name + "%'"
            console.log(query)
            connection.query(query, function(err, result, fields) {
                if (err) {
                    console.log(err)
                    reject(err)
                }
                console.log(JSON.parse(JSON.stringify(result)));
                var response = { data: [], status: 1, message: "" }
                response.data = JSON.parse(JSON.stringify(result))
                if (result.length == 0) {
                    response.message = "No such user";
                } else {
                    response.message = "Success";
                }
                resolve(response);
            });
            connection.release();
        });
    });
};


/* Get user matching email*/

user.getUserWithEmail = function(email) {
    return new Promise(function(resolve, reject) {
        createConnection(function(err, connection) {
            var data = [];
            var query = "SELECT `name`, `email` FROM user WHERE  email LIKE '" + email + "' LIMIT 1"
            console.log(query)
            connection.query(query, function(err, result, fields) {
                if (err) {
                    console.log(err)
                    reject(err)
                }
                console.log(JSON.parse(JSON.stringify(result)));
                var response = { data: [], status: 1, message: "" }
                response.data = JSON.parse(JSON.stringify(result))
                if (result.length == 0) {
                    response.message = "No such user";
                    response.status = 0;
                } else {
                    response.message = "Success";
                }
                resolve(response);
            });
            connection.release();
        });
    });
};


/* Create users(s)*/
/* TODO: Take image in formdata and convert to image url and then store*/
user.insert = function(iUser) {
    return new Promise(function(resolve, reject) {
        createConnection(function(err, connection) {
            var data = [];
            var values = "";
            console.log(user)
            user.getUserWithEmail(iUser.email).then(function(isDuplicateEmail) {
                if (isDuplicateEmail.status == 0) {
                    values += " ( '" + iUser.name + "','" + iUser.email + "','" + randomstring.generate() + "')";

                    console.log(`Values : ${values}`);
                    var query = "INSERT INTO `user`(`name`,`email`,`password`) VALUES" + values;
                    console.log(query)
                    connection.query(query, function(err, result, fields) {
                        if (err) {
                            console.log(err)
                            reject(err)
                        }
                        console.log(JSON.parse(JSON.stringify(result)));
                        var response = { data: [], status: 1, message: "" }
                        response.data = JSON.parse(JSON.stringify(result))
                        if (result.affectedRows == 0) {
                            response.message = "Insertion failed!";
                        } else {
                            response.message = "Success";
                        }
                        resolve(response);
                    });
                } else {
                    var response = { data: [], status: 0, message: "Email Id already registered!" }
                    resolve(response);
                }
            });
            connection.release();
        });
    });
};


/* Update user*/
user.update = function(user) {
    return new Promise(function(resolve, reject) {
        createConnection(function(err, connection) {
            var data = [];
            var query = "UPDATE `user` SET user.name = '" + user.name + "' WHERE user.user_id='" + user.user_id + "'";
            connection.query(query, function(err, result, fields) {
                if (err) {
                    console.log(err)
                    reject(err)
                }
                console.log(JSON.parse(JSON.stringify(result)));
                var response = { data: [], status: 1, message: "" }
                    //response.data = JSON.parse(JSON.stringify(result))
                if (result.changedRows == 0) {
                    response.message = "Failed to update!";
                    response.status = 0
                } else {
                    response.message = "Successfully updated!";
                }
                resolve(response);
            });
            connection.release();
        });
    });
};

/* Delete a user*/
user.delete = function(user_id) {
    return new Promise(function(resolve, reject) {
        createConnection(function(err, connection) {
            var data = [];
            var query = "DELETE FROM `user` WHERE `user_id` = '" + user_id + "'";
            connection.query(query, function(err, result, fields) {
                if (err) {
                    console.log(err)
                    reject(err)
                }
                console.log(JSON.parse(JSON.stringify(result)));
                var response = { data: [], status: 1, message: "" }
                    //response.data = JSON.parse(JSON.stringify(result))
                if (result.affectedRows == 0) {
                    response.message = "Failed to delete!";
                    response.status = 0
                } else {
                    response.message = "Successfully Deleted!";
                }
                resolve(response);
            });
            connection.release();
        });
    });
};


user.login = function(user) {
    return new Promise(function(resolve, reject) {
        createConnection(function(err, connection) {
            var data = [];
            var query = "SELECT `password` FROM user WHERE  email LIKE '" + user.email + "' LIMIT 1"
            console.log(query)
            connection.query(query, function(err, result, fields) {
                if (err) {
                    console.log(err)
                    reject(err)
                }
                console.log(JSON.parse(JSON.stringify(result)));
                var response = { data: [], status: 1, message: "" }

                if (result.length == 0) {
                    response.message = "No such user";
                    response.status = 0;
                } else {
                    if (result[0].password == user.password) {
                        response.message = "Success";
                    } else {
                        response.message = "Email ID and password did not match!"
                    }

                }

                resolve(response);
            });
            connection.release();
        });
    });
};


user.getAllBooksBought = function(id) {
    return new Promise(function(resolve, reject) {
        createConnection(function(err, connection) {
            var data = [];
            var query = "SELECT b.book_name, a.author_name, c.category_name , p.publication_name, b.yop, b.description, b.stock , b.price" +
                " FROM `order_details` " +
                " LEFT JOIN book as b ON order_details.book_id = b.book_id" +
                " LEFT JOIN author as a ON b.author_id = a.author_id " +
                "LEFT JOIN category as c ON b.category_id = c.category_id " +
                "LEFT JOIN publication as p ON b.publication_id = p.publication_id " +
                "WHERE user_id=" + id;
            console.log(query)
            connection.query(query, function(err, result, fields) {
                if (err) {
                    console.log(err)
                    reject(err)
                }
                console.log(JSON.parse(JSON.stringify(result)));
                var response = { data: [], status: 1, message: "" }
                response.data = JSON.parse(JSON.stringify(result))
                if (result.length == 0) {
                    response.message = "No such user";
                    response.status = 0;
                } else {
                    response.message = "Success";
                }
                resolve(response);
            });
            connection.release();
        });

    });
};


module.exports = user;