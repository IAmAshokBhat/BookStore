var expect = require("chai").expect;
var chai = require("chai");
var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);
var bookStore = require("../app");
describe("Author", function() {
    this.timeout(5000);
    // describe("getAllAuthors()", function() {
    //     it("should all users in DB with proper format", function(done) {
    //         //controller.get('/')
    //         api.get('/api/authors')
    //             .set('Accept', 'application/json')
    //             .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXNob2tiaGF0ekBnbWFpbC5jb20.YtWhunO5WHQMLwhv2o7XMqSoEqtfSzvbXkvFbvHaDKE')
    //             .expect(200, done);
    //     });
    // });

    // describe("getAllAuthors() from author", function() {

    //     it("should all users in DB with proper format", function() {
    //         author.getAllAuthors(function(response) {
    //             expect(response).to.be.ok;
    //         })
    //     });
    // });

    // describe("getAllAuthors() from controller", function() {

    //     it("should all users in DB with proper format", function() {
    //         app.get('/authors', function(response) {
    //             console.log(response);
    //             expect(response).to.be.ok;
    //         });
    //     });
    // });


    describe("getAllAuthors() ", function() {

        it("should return all users in DB in proper format", function(done) {
            chai.request(bookStore)
                .get('/api/authors')
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
    describe("Insert author", function() {

        it("should insert all supplied authors", function(done) {
            chai.request(bookStore)
                .post('/api/author')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXNob2tiaGF0ekBnbWFpbC5jb20.YtWhunO5WHQMLwhv2o7XMqSoEqtfSzvbXkvFbvHaDKE')
                .send([{ author_name: 'testAuthor11144a' }, { author_name: 'testAuthor211333a' }])
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body.status).to.equal(1);
                    done();
                });

        });
    });
    describe("Insert author fail case", function() {

        it("should insert all supplied authors", function(done) {
            chai.request(bookStore)
                .post('/api/author')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXNob2tiaGF0ekBnbWFpbC5jb20.YtWhunO5WHQMLwhv2o7XMqSoEqtfSzvbXkvFbvHaDKE')
                .send([{ author_names: 'testAuthor11144a' }, ])
                .end((err, res) => {
                    res.should.have.status(400);
                    expect(res.body.status).to.equal(0);
                    done();
                });

        });
    });
    describe("update author", function() {

        it("should update author matching id", function(done) {
            chai.request(bookStore)
                .put('/api/author')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXNob2tiaGF0ekBnbWFpbC5jb20.YtWhunO5WHQMLwhv2o7XMqSoEqtfSzvbXkvFbvHaDKE')
                .send({ author_name: 'Lee Child', author_id: '1' })
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body.status).to.equal(1);
                    done();
                });

        });
    });

    describe("Delete author", function() {

        it("should  delete author matching id", function(done) {
            chai.request(bookStore)
                .delete('/api/author?author_id=0')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXNob2tiaGF0ekBnbWFpbC5jb20.YtWhunO5WHQMLwhv2o7XMqSoEqtfSzvbXkvFbvHaDKE')
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body.status).to.equal(1);
                    done();
                });

        });
    });

    describe("Delete unknown author", function() {

        it("should not delete author matching id", function(done) {
            chai.request(bookStore)
                .delete('/api/author?author_id=999')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXNob2tiaGF0ekBnbWFpbC5jb20.YtWhunO5WHQMLwhv2o7XMqSoEqtfSzvbXkvFbvHaDKE')
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body.status).to.equal(0);
                    done();
                });

        });
    });

    describe("Get total books sold by author", function() {

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