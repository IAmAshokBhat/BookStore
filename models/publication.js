var utilities = require('../utilities/database_connection');

var publication = {};

/* Get all publications*/

publication.getAllPublications = function() {
    var query = "SELECT * FROM publication";
    return utilities.executeQuery(query);
};

/* Get publication matching id*/

publication.getPublicationWithId = function(id) {
    var query = "SELECT * FROM publication where publication_id=" + id;
    return utilities.executeQuery(query);

};

/* Get publication matching name*/

publication.getPublicationWithName = function(name) {
    var query = "SELECT * FROM publication WHERE  publication_name LIKE '" + name + "%'"
    return utilities.executeQuery(query);

};


/* Insert publication(s)*/
/* TODO: Take image in formdata and convert to image url and then store*/
publication.insert = function(publications) {
    return new Promise(function(resolve, reject) {
        utilities.getConnection(function(err, connection) {
            var data = [];
            var values = "";
            console.log(publications)
            for (var index = 0; index < publications.length; index++) {
                var element = publications[index];
                if (publications[index].publication_name) {
                    values += " ( '" + publications[index].publication_name + "'),"
                }

            }
            values = values.slice(0, -1);
            console.log(`Values : ${values}`);
            var query = "INSERT INTO `publication`(`publication_name`) VALUES" + values;
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


/* Update publication*/
/* TODO: Take image in formdata and convert to image url and then store*/
publication.update = function(publication) {
    return new Promise(function(resolve, reject) {
        utilities.getConnection(function(err, connection) {
            var data = [];
            var query = "UPDATE `publication` SET publication.publication_name = '" + publication.publication_name + "' WHERE publication.publication_id='" + publication.publication_id + "'";
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

/* Delete a publication*/
publication.delete = function(publication_id) {
    return new Promise(function(resolve, reject) {
        utilities.getConnection(function(err, connection) {
            var data = [];
            var query = "DELETE FROM `publication` WHERE `publication_id` = '" + publication_id + "'";
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
module.exports = publication;