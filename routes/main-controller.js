var express = require('express');
var router = express.Router();
var book = require('../models/book');
var publication = require('../models/publication');
var category = require('../models/category');
var author = require('../models/author');
var user = require('../models/user');

require('dotenv').config();

/* GET all books listing. */
router.get('/books', function(req, res, next) {
    book.getAllBooks().then(function(result) {
        res.json(result);
    });

});

/* GET book with id. */
router.get('/getBookWithId', function(req, res, next) {
    console.log(req.query.bookId)
    book.getBookWithId(req.query.bookId).then(function(result) {
        res.json(result);
    });

});

/* GET book with name */
router.get('/getBookWithName', function(req, res, next) {
    console.log(req.query.bookName)
    book.getBookWithName(req.query.bookName).then(function(result) {
        res.json(result);
    });

});

/* Insert book(s) */
router.post('/book', function(req, res, next) {
    console.log(req.body)
    book.insert(req.body).then(function(result) {
        res.json(result);
    });

});

/* Update book(s) */
router.post('/book/update', function(req, res, next) {
    console.log(req.body)
    book.update(req.body).then(function(result) {
        res.json(result);
    });

});

/* Delete book */
router.delete('/book', function(req, res, next) {
    console.log(req.query.book_id)
    book.delete(req.query.book_id).then(function(result) {
        res.json(result);
    });

});


/* GET all publication listing. */
router.get('/publications', function(req, res, next) {
    publication.getAllPublications().then(function(result) {
        res.json(result);
    });

});

/* GET publication with id. */
router.get('/getPublicationWithId', function(req, res, next) {
    publication.getPublicationWithId(req.query.publicationId).then(function(result) {
        res.json(result);
    });

});

/* GET publication with name */
router.get('/getPublicationWithName', function(req, res, next) {
    publication.getPublicationWithName(req.query.publicationName).then(function(result) {
        res.json(result);
    });

});

/* Insert publication(s) */
router.post('/publications', function(req, res, next) {
    publication.insert(req.body).then(function(result) {
        res.json(result);
    });

});

/* Update publication(s) */
router.post('/publication/update', function(req, res, next) {
    publication.update(req.body).then(function(result) {
        res.json(result);
    });

});

/* Delete publication */
router.delete('/publication', function(req, res, next) {
    publication.delete(req.query.publication_id).then(function(result) {
        res.json(result);
    });

});



/* GET all category listing. */
router.get('/categories', function(req, res, next) {
    category.getAllCategories().then(function(result) {
        res.json(result);
    });

});

/* GET category with id. */
router.get('/getCategoryWithId', function(req, res, next) {
    category.getCategoryWithId(req.query.category_id).then(function(result) {
        res.json(result);
    });

});

/* GET category with name */
router.get('/getCategoryWithName', function(req, res, next) {
    category.getCategoryWithName(req.query.category_name).then(function(result) {
        res.json(result);
    });

});

/* Insert category(s) */
router.post('/categories', function(req, res, next) {
    category.insert(req.body).then(function(result) {
        res.json(result);
    });

});

/* Update category(s) */
router.post('/category/update', function(req, res, next) {
    category.update(req.body).then(function(result) {
        res.json(result);
    });

});

/* Delete category */
router.delete('/category', function(req, res, next) {
    category.delete(req.query.category_id).then(function(result) {
        res.json(result);
    });

});



/* GET all author listing. */
router.get('/authors', function(req, res, next) {
    author.getAllAuthors().then(function(result) {
        res.json(result);
    });

});

/* GET author with id. */
router.get('/getAuthorWithId', function(req, res, next) {
    author.getAuthorWithId(req.query.author_id).then(function(result) {
        res.json(result);
    });

});

/* GET author with name */
router.get('/getAuthorWithName', function(req, res, next) {
    author.getAuthorWithName(req.query.author_name).then(function(result) {
        res.json(result);
    });

});

/* Insert author(s) */
router.post('/authors', function(req, res, next) {

    author.insert(req.body).then(function(result) {
        res.json(result);
    });

});

/* Update author(s) */
router.post('/author/update', function(req, res, next) {
    author.update(req.body).then(function(result) {
        res.json(result);
    });

});

/* Delete author */
router.delete('/author', function(req, res, next) {
    author.delete(req.query.author_id).then(function(result) {
        res.json(result);
    });

});



/* GET all user listing. */
router.get('/users', function(req, res, next) {
    user.getAllUsers().then(function(result) {
        res.json(result);
    });

});

/* GET user with id. */
router.get('/getUserWithId', function(req, res, next) {
    user.getUserWithId(req.query.user_id).then(function(result) {
        res.json(result);
    });

});

/* GET user with name */
router.get('/getUserWithName', function(req, res, next) {
    user.getUserWithName(req.query.user_name).then(function(result) {
        res.json(result);
    });

});

/* Insert user(s) */
router.post('/user', function(req, res, next) {

    user.insert(req.body).then(function(result) {
        res.json(result);
    });

});


/* Update author(s) */
router.post('/user/update', function(req, res, next) {
    user.update(req.body).then(function(result) {
        res.json(result);
    });

});

/* Delete author */
router.delete('/user', function(req, res, next) {
    user.delete(req.query.user_id).then(function(result) {
        res.json(result);
    });

});

/* Login user(s) */
router.post('/login', function(req, res, next) {
    user.login(req.body).then(function(result) {
        res.json(result);
    });

});



/* Buy book(s) */
router.post('/buy', function(req, res, next) {
    book.buy(req.body).then(function(result) {
        res.json(result);
    }).catch(function(params) {
        res.json(params);
    });

});

/* GET total number of  books sold */
router.get('/totalBooksSold', function(req, res, next) {
    book.totalBooksSold().then(function(result) {
        res.json(result);
    });

});

/* GET books bought by a user */
router.get('/getBooksBoughtByUser', function(req, res, next) {
    user.getAllBooksBought(req.query.user_id).then(function(result) {
        res.json(result);
    });

});

/* GET all books sold of a author */
router.get('/getAllBooksSoldOfAuthor', function(req, res, next) {
    author.getAllBooksSoldOfAuthor(req.query.author_id).then(function(result) {
        res.json(result);
    });

});


module.exports = router;