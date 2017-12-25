var utilities = require('../utilities/database_connection');
var author = {};

/* Get all publications*/

author.getAllAuthors = function() {
    var query = "SELECT * FROM author";
    return utilities.executeQuery(query);

};

/* Get author matching id*/

author.getAuthorWithId = function(id) {
    var query = "SELECT * FROM author where author_id=" + id;
    return utilities.executeQuery(query);

};

/* Get author matching name*/

author.getAuthorWithName = function(name) {
    var query = "SELECT * FROM author WHERE  author_name LIKE '" + name + "%'"
    return utilities.executeQuery(query);

};


/* Insert author(s)*/
/* TODO: Take image in formdata and convert to image url and then store*/
author.insert = function(authors) {
    return new Promise(function(resolve, reject) {
        utilities.getConnection(function(err, connection) {
            var data = [];
            var values = "";
            for (var index = 0; index < authors.length; index++) {
                var element = authors[index];
                if (authors[index].author_name) {
                    values += " ( '" + authors[index].author_name + "'),"
                } else {
                    reject({ "message": "Invalid Key in request", "status": 0 });
                }

            }
            values = values.slice(0, -1);
            var query = "INSERT INTO `author`(`author_name`) VALUES" + values;
            try {
                connection.query(query, function(err, result, fields) {
                    if (err) {

                        var response = { data: [], status: 0, message: "" }
                        response.message = err;
                        reject(response)
                    } else {
                        var response = { data: [], status: 1, message: "" }

                        // response.data = JSON.parse(JSON.stringify(result))
                        if (result.affectedRows != 0) {
                            response.message = "No data";
                        } else {
                            response.message = "Success";
                        }
                        resolve(response);
                    }

                });
            } catch (error) {

                reject(error)
            }

            connection.release();
        });
    });
};


/* Update author*/
/* TODO: Take image in formdata and convert to image url and then store*/
author.update = function(author) {
    return new Promise(function(resolve, reject) {
        utilities.getConnection(function(err, connection) {
            var data = [];
            var query = "UPDATE `author` SET author.author_name = '" + author.author_name + "' WHERE author.author_id='" + author.author_id + "'";
            connection.query(query, function(err, result, fields) {
                if (err) {
                    var response = { data: [], status: 0, message: "" }
                    response.message = err;
                    reject(response)
                }
                //   console.log(JSON.parse(JSON.stringify(result)));
                var response = { data: [], status: 1, message: "" }
                response.data = JSON.parse(JSON.stringify(result));
                if (result.affectedRows == 0) {
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

/* Delete a author*/
author.delete = function(author_id) {
    return new Promise(function(resolve, reject) {
        utilities.getConnection(function(err, connection) {
            var data = [];
            var query = "DELETE FROM `author` WHERE `author_id` = '" + author_id + "'";
            connection.query(query, function(err, result, fields) {
                if (err) {
                    var response = { data: [], status: 0, message: "" }
                    response.message = err;
                    reject(response)
                }
                //  console.log(JSON.parse(JSON.stringify(result)));
                var response = { data: [], status: 1, message: "" }
                response.data = JSON.parse(JSON.stringify(result))
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


author.getAllBooksSoldOfAuthor = function(id) {
    var query = "SELECT b.book_name,  a.author_name,  SUM(order_details.quantity) AS number_of_books " +
        "FROM `order_details` " +
        "LEFT JOIN book AS b ON    order_details.book_id = b.book_id " +
        "LEFT JOIN author AS a ON b.author_id = a.author_id " +
        "WHERE  a.author_id =" + id +
        " GROUP BY order_details.book_id";
    return utilities.executeQuery(query);


};
module.exports = author;