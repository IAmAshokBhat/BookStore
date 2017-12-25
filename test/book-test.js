var expect = require("chai").expect;
var chai = require("chai");
var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);
var bookStore = require("../app");
describe("book", function() {
    this.timeout(5000);
    describe("getAllBooks() ", function() {

        it("should return all users in DB in proper format", function(done) {
            chai.request(bookStore)
                .get('/api/books')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXNob2tiaGF0ekBnbWFpbC5jb20.YtWhunO5WHQMLwhv2o7XMqSoEqtfSzvbXkvFbvHaDKE')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    expect(res.body.data[0]).to.have.property("author_name");
                    expect(res.body.data[0].author_name).to.not.equal(null);
                    expect(res.body.data[0]).to.have.property("author_id");
                    expect(res.body.data[0].author_id).to.not.equal(null);
                    done();
                });

        });
    });

    describe("getAuthorWithId() ", function() {

        it("should get user matching the ID", function(done) {
            chai.request(bookStore)
                .get('/api/getAuthorWithId?author_id=1')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXNob2tiaGF0ekBnbWFpbC5jb20.YtWhunO5WHQMLwhv2o7XMqSoEqtfSzvbXkvFbvHaDKE')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    expect(res.body.data[0]).to.have.property("author_name");
                    expect(res.body.data[0].author_name).to.not.equal(null);
                    expect(res.body.data[0]).to.have.property("author_id");
                    expect(res.body.data[0].author_id).to.not.equal(null);
                    done();
                });

        });
    });
    describe("getAuthorWithName() ", function() {

        it("should get user matching the Name", function(done) {
            chai.request(bookStore)
                .get('/api/getAuthorWithName?author_name=l')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXNob2tiaGF0ekBnbWFpbC5jb20.YtWhunO5WHQMLwhv2o7XMqSoEqtfSzvbXkvFbvHaDKE')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    expect(res.body.data[0]).to.have.property("author_name");
                    expect(res.body.data[0].author_name).to.not.equal(null);
                    expect(res.body.data[0]).to.have.property("author_id");
                    expect(res.body.data[0].author_id).to.not.equal(null);
                    done();
                });

        });
    });
    describe("Insert book", function() {

        it("should insert all supplied books", function(done) {
            chai.request(bookStore)
                .post('/api/book')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXNob2tiaGF0ekBnbWFpbC5jb20.YtWhunO5WHQMLwhv2o7XMqSoEqtfSzvbXkvFbvHaDKE')
                .send([{ author_name: 'testAuthor11144a' }, { author_name: 'testAuthor211333a' }])
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body.status).to.equal(1);
                    done();
                });

        });
    });
    describe("Insert book fail case", function() {

        it("should insert all supplied books", function(done) {
            chai.request(bookStore)
                .post('/api/book')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXNob2tiaGF0ekBnbWFpbC5jb20.YtWhunO5WHQMLwhv2o7XMqSoEqtfSzvbXkvFbvHaDKE')
                .send([{ author_names: 'testAuthor11144a' }, ])
                .end((err, res) => {
                    res.should.have.status(400);
                    expect(res.body.status).to.equal(0);
                    done();
                });

        });
    });
    describe("update book", function() {

        it("should update book matching id", function(done) {
            chai.request(bookStore)
                .put('/api/book')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXNob2tiaGF0ekBnbWFpbC5jb20.YtWhunO5WHQMLwhv2o7XMqSoEqtfSzvbXkvFbvHaDKE')
                .send({ author_name: 'Lee Child', author_id: '1' })
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body.status).to.equal(1);
                    done();
                });

        });
    });

    describe("Delete book", function() {

        it("should  delete book matching id", function(done) {
            chai.request(bookStore)
                .delete('/api/book?author_id=0')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXNob2tiaGF0ekBnbWFpbC5jb20.YtWhunO5WHQMLwhv2o7XMqSoEqtfSzvbXkvFbvHaDKE')
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body.status).to.equal(1);
                    done();
                });

        });
    });

    describe("Delete unknown book", function() {

        it("should not delete book matching id", function(done) {
            chai.request(bookStore)
                .delete('/api/book?author_id=999')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXNob2tiaGF0ekBnbWFpbC5jb20.YtWhunO5WHQMLwhv2o7XMqSoEqtfSzvbXkvFbvHaDKE')
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body.status).to.equal(0);
                    done();
                });

        });
    });

    describe("Get total books sold by book", function() {

        it("should return total", function(done) {
            chai.request(bookStore)
                .get('/api/getAllBooksSoldOfAuthor?author_id=1')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXNob2tiaGF0ekBnbWFpbC5jb20.YtWhunO5WHQMLwhv2o7XMqSoEqtfSzvbXkvFbvHaDKE')
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body.status).to.equal(1);
                    expect(res.body.data[0]).to.have.property("book_name");
                    expect(res.body.data[0].book_name).to.not.equal(null);
                    expect(res.body.data[0]).to.have.property("author_name");
                    expect(res.body.data[0].author_name).to.not.equal(null);
                    expect(res.body.data[0]).to.have.property("number_of_books");
                    expect(res.body.data[0].number_of_books).to.not.equal(null);
                    done();
                });

        });
    });

});