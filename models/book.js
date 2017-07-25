var createConnection = require('../utilities/database_connection');

var book = {};

/* Get all books*/

book.getAllBooks = function() {
    return new Promise(function(resolve, reject) {
        createConnection(function(err, connection) {
            var data = [];
            connection.query("SELECT book.book_name, a.author_name, c.category_name , p.publication_name, book.yop, book.description, book.stock , book.price" +
                " FROM `book` " +
                "LEFT JOIN author as a ON book.author_id = a.author_id " +
                "LEFT JOIN category as c ON book.category_id = c.category_id " +
                "LEFT JOIN publication as p ON book.publication_id = p.publication_id ",
                function(err, result, fields) {
                    if (err) {
                        console.log(err)
                        reject(err)
                    }
                    console.log(JSON.parse(JSON.stringify(result)));
                    var response = { data: [], status: 1, message: "" }
                    response.data = JSON.parse(JSON.stringify(result))
                    if (result.length == 0) {
                        response.message = "No data";
                    } else {
                        response.message = "Success";
                    }
                    resolve(response);
                });
            connection.release();
        });
    });
};

/* Get book matching id*/

book.getBookWithId = function(id) {
    return new Promise(function(resolve, reject) {
        createConnection(function(err, connection) {
            var data = [];
            connection.query("SELECT book.book_name, a.author_name, c.category_name , p.publication_name, book.yop, book.description, book.stock , book.price" +
                " FROM `book` " +
                "LEFT JOIN author as a ON book.author_id = a.author_id " +
                "LEFT JOIN category as c ON book.category_id = c.category_id " +
                "LEFT JOIN publication as p ON book.publication_id = p.publication_id " +
                "WHERE book_id=" + id,
                function(err, result, fields) {
                    if (err) {
                        console.log(err)
                        reject(err)
                    }
                    console.log(JSON.parse(JSON.stringify(result)));
                    var response = { data: [], status: 1, message: "" }
                    response.data = JSON.parse(JSON.stringify(result))
                    if (result.length == 0) {
                        response.message = "No data";
                    } else {
                        response.message = "Success";
                    }
                    resolve(response);
                });
            connection.release();
        });
    });
};

/* Get book matching name*/

book.getBookWithName = function(name) {
    return new Promise(function(resolve, reject) {
        createConnection(function(err, connection) {
            var data = [];
            console.log(name)
            var query = "SELECT book.book_name, a.author_name, c.category_name , p.publication_name, book.yop, book.description, book.stock , book.price" +
                " FROM `book` " +
                "LEFT JOIN author as a ON book.author_id = a.author_id " +
                "LEFT JOIN category as c ON book.category_id = c.category_id " +
                "LEFT JOIN publication as p ON book.publication_id = p.publication_id " +
                "WHERE book_name LIKE '" + name + "%'"
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
                    response.message = "No data";
                } else {
                    response.message = "Success";
                }
                resolve(response);
            });
            connection.release();
        });
    });
};


/* Insert book(s)*/
/* TODO: Take image in formdata and convert to image url and then store*/
book.insert = function(books) {
    return new Promise(function(resolve, reject) {
        createConnection(function(err, connection) {
            var data = [];
            var values = "";
            console.log(books)
            for (var index = 0; index < books.length; index++) {
                var element = books[index];
                values += " ( '" + (books[index].book_name || "defaultBookName") + "', " + "'" + (books[index].description || "description") + "', " + "'" + (books[index].thumb_url || "https://images-eu.ssl-images-amazon.com/images/I/51F2-J1IW-L._AC_US218_FMwebp_QL70_.jpg") + "', " + "'" + (books[index].price || "100") + "', " + "'" + (books[index].yop || "2017") + "', " + "'" + (books[index].autor_id || "1") + "', " + "'" + (books[index].publication_id || "1") + "', " + "'" + (books[index].category_id || "1") + "'),"
            }

            values = values.slice(0, -1);
            console.log(`Values : ${values}`);
            var query = "INSERT INTO `book`(`book_name`, `description`, `thumb_url`, `price`, `yop`, `author_id`, `publication_id`, `category_id`) VALUES" + values;
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
                    response.message = "No data";
                } else {
                    response.message = "Success";
                }
                resolve(response);
            });
            connection.release();
        });
    });
};


/* Update book*/
/* TODO: Take image in formdata and convert to image url and then store*/
book.update = function(book) {
    return new Promise(function(resolve, reject) {
        createConnection(function(err, connection) {
            var data = [];
            var queryBuilder = "";
            Object.keys(book).forEach(function(element) {
                queryBuilder += element + "='" + book[element] + "',";
            }, this);

            queryBuilder = queryBuilder.slice(0, -1);
            var query = "UPDATE `book` SET " + queryBuilder + "WHERE book.book_id=" + book.book_id;

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

/* Delete a book*/
book.delete = function(book_id) {
    return new Promise(function(resolve, reject) {
        createConnection(function(err, connection) {
            var data = [];
            var query = "DELETE FROM `book` WHERE `book_id` = '" + book_id + "'";
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

var checkStock = function(book_id, quantity) {
    return new Promise(function(resolve, reject) {
        createConnection(function(err, connection) {
            var data = [];
            var query = "SELECT book.stock FROM `book` WHERE `book_id` = '" + book_id + "' LIMIT 1";
            connection.query(query, function(err, result, fields) {
                if (err) {
                    console.log(err)
                    reject(err)
                }
                console.log(JSON.parse(JSON.stringify(result)));
                var response = false;
                if (result.length == 0) {
                    response = false;
                } else {
                    if (result[0].stock >= quantity) {
                        response = true;
                    }
                }
                resolve(response);
            });
            connection.release();
        });
    });
};

/* Payment gateway mock */

var payment = function() {
    return new Promise(function(resolve, reject) {
        resolve(true)
    });

}

var reduceStock = function(book_id, quantity) {
    return new Promise(function(resolve, reject) {
        createConnection(function(err, connection) {
            var data = [];
            var query = "UPDATE book SET `stock` = stock - " + quantity + " WHERE `book_id` = '" + book_id + "' LIMIT 1";
            connection.query(query, function(err, result, fields) {
                if (err) {
                    console.log(err)
                    reject(err)
                }
                var response;
                if (result.length == 0) {
                    response = false;
                } else {
                    response = true;
                }
                resolve(response);
            });
            connection.release();
        });
    });
}

/* Buy book */

book.buy = function(orderDetails) {

        return new Promise(function(resolve, reject) {

            try {
                createConnection(function(err, connection) {

                    checkStock(orderDetails.book_id, orderDetails.quantity).then(function(result) {
                        var response = { data: [], status: 1, message: "" }
                        if (result) {

                            console.log("We can process request, in stock");
                            payment().then(function(paymentStatus) {
                                console.log(paymentStatus)
                                if (paymentStatus) {
                                    var values = " ( '" + orderDetails.user_id + "', " + "'" + orderDetails.book_id + "', " + "'" + orderDetails.quantity + "', 'NB' )";
                                    var query = "INSERT INTO `order_details`(`user_id`, `book_id`, `quantity`, `payment_method`) VALUES" + values;
                                    console.log(query)
                                    connection.query(query, function(err, result, fields) {
                                        if (err) {
                                            console.log("Yes there is an error")
                                            reject(err);
                                        }

                                        if (result.length == 0) {
                                            response.message = "No data";
                                        } else {
                                            reduceStock(orderDetails.book_id, orderDetails.quantity).then(function(reduceStockStatus) {
                                                if (reduceStockStatus) {
                                                    response.message = "Success";
                                                    resolve(response);
                                                } else {
                                                    response.message = "Failure";
                                                    resolve(response);
                                                }
                                            });

                                        }

                                    });

                                } else {
                                    response.message = "Payment failed! If money was deducted from your account, it will be refunded within 7 days";
                                    response.status = 0;
                                    reject(response)
                                }
                            });
                        } else {
                            console.log("Stock is less")
                            response.message = "We are out of Stock!";
                            response.status = 0;
                            reject(response)
                        }
                        connection.release();
                    });

                });

            } catch (error) {
                console.log("Catch error out")
                response.message = error;
                response.status = 0;
                reject(response)
            }

        });


    }
    //

book.totalBooksSold = function() {
    return new Promise(function(resolve, reject) {
        createConnection(function(err, connection) {
            var data = [];
            var query = "SELECT SUM(quantity) as total_books_sold FROM `order_details`";
            connection.query(query, function(err, result, fields) {
                if (err) {
                    console.log(err)
                    reject(err)
                }
                console.log(JSON.parse(JSON.stringify(result)));
                console.log(JSON.parse(JSON.stringify(result)));
                var response = { data: [], status: 1, message: "" }
                response.data = JSON.parse(JSON.stringify(result))
                if (result.length == 0) {
                    response.message = "No Orders Yet";
                } else {
                    response.message = "Success";
                }
                resolve(response);
            });
            connection.release();
        });
    });
};

module.exports = book;