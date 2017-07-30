var utilities = require('../utilities/database_connection');
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
            console.log(categories)
            for (var index = 0; index < categories.length; index++) {
                var element = categories[index];
                if (categories[index].category_name) {
                    values += " ( '" + categories[index].category_name + "'),"
                }

            }
            values = values.slice(0, -1);
            console.log(`Values : ${values}`);
            var query = "INSERT INTO `category`(`category_name`) VALUES" + values;
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


/* Update category*/
/* TODO: Take image in formdata and convert to image url and then store*/
category.update = function(category) {
    return new Promise(function(resolve, reject) {
        utilities.getConnection(function(err, connection) {
            var data = [];
            var query = "UPDATE `category` SET category.category_name = '" + category.category_name + "' WHERE category.category_id='" + category.category_id + "'";
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

/* Delete a category*/
category.delete = function(category_id) {
    return new Promise(function(resolve, reject) {
        utilities.getConnection(function(err, connection) {
            var data = [];
            var query = "DELETE FROM `category` WHERE `category_id` = '" + category_id + "'";
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
module.exports = category;