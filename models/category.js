var utilities = require('../utilities/database_connection');
var dateFormat = require('dateformat');
var category = {};

/* Get all publications*/

category.getAllCategories = function() {
    var query = "SELECT * FROM category";
    return utilities.executeQuery(query);

};

/* Get category matching id*/

category.getCategoryWithId = function(id) {
    var query = "SELECT * FROM category where category_id=" + id;
    return utilities.executeQuery(query);

};

/* Get category matching name*/

category.getCategoryWithName = function(name) {
    var query = "SELECT * FROM category WHERE  category_name LIKE '" + name + "%'"
    return utilities.executeQuery(query);
};


/* Insert category(s)*/
/* TODO: Take image in formdata and convert to image url and then store*/
category.insert = function(categories) {
    return new Promise(function(resolve, reject) {
        utilities.getConnection(function(err, connection) {
            var data = [];
            var values = "";
            for (var index = 0; index < categories.length; index++) {
                var element = categories[index];
                if (categories[index].category_name) {
                    values += " ( '" + categories[index].category_name + "'),"
                }

            }
            values = values.slice(0, -1);
            var query = "INSERT INTO `category`(`category_name`) VALUES" + values;
            connection.query(query, function(err, result, fields) {
                if (err) {
                    var response = { data: [], status: 0, message: "" }
                    response.message = err;
                    reject(response)
                } else {
                    var response = { data: [], status: 1, message: "" }
                    if (result.affectedRows != 0) {
                        response.message = "No data";
                    } else {
                        response.message = "Success";
                    }
                    resolve(response);
                }
            });
            connection.release();
        });
    });
};


/* Update category*/
/* TODO: Take image in formdata and convert to image url and then store*/
category.update = function(category) {
    return new Promise(function(resolve, reject) {
        utilities.getConnection(function(err, connection) {
            var data = [];
            var query = "UPDATE `category` SET category.category_name = '" + category.category_name + "' WHERE category.category_id='" + category.category_id + "'";
            connection.query(query, function(err, result, fields) {
                if (err) {
                    var response = { data: [], status: 0, message: "" }
                    response.message = err;
                    reject(response)
                }
                var response = { data: [], status: 1, message: "" }
                    //response.data = JSON.parse(JSON.stringify(result))
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

/* Delete a category*/
category.delete = function(category_id) {
    return new Promise(function(resolve, reject) {
        utilities.getConnection(function(err, connection) {
            var data = [];
            var query = "DELETE FROM `category` WHERE `category_id` = '" + category_id + "'";
            connection.query(query, function(err, result, fields) {
                if (err) {
                    var response = { data: [], status: 0, message: "" }
                    response.message = err;
                    reject(response)
                }
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

/* Get highest selling category */
category.getHighestSelling = function(fromDate, toDate) {

    var query = "SELECT o.order_id, c.category_id  , c.category_name as Name  , o.book_id  , o.date_of_purchase  , SUM(o.quantity) as Total   " +
        "FROM `order_details` as o " +
        "LEFT JOIN book as b on b.book_id = o.book_id " +
        "LEFT JOIN category as c on c.category_id = b.book_id " +
        "GROUP BY c.category_id , o.book_id " +
        "ORDER BY Total DESC LIMIT 1 ";
    if (fromDate && toDate) {
        query += "WHERE `date_of_purchase` BETWEEN '" + dateFormat(fromDate, "yyyy-mm-dd , h:MM:ss ") + "' AND '" + (dateFormat(toDate, "yyyy-mm-dd , h:MM:ss ") || new Date()) + "'";
    }
    return utilities.executeQuery(query);
};

module.exports = category;