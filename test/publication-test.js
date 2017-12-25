var expect = require("chai").expect;
var chai = require("chai");
var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);
var bookStore = require("../app");

describe("Publication APIs", function() {
    this.timeout(5000);
    describe("getAllPublications() ", function() {

        it("should return all publications in DB in proper format", function(done) {
            chai.request(bookStore)
                .get('/api/publications')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXNob2tiaGF0ekBnbWFpbC5jb20.YtWhunO5WHQMLwhv2o7XMqSoEqtfSzvbXkvFbvHaDKE')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    expect(res.body.data[0]).to.have.property("publication_name");
                    expect(res.body.data[0].publication_name).to.not.equal(null);
                    expect(res.body.data[0]).to.have.property("publication_id");
                    expect(res.body.data[0].publication_id).to.not.equal(null);
                    done();
                });

        });
    });

    describe("getPublicationWithId() ", function() {

        it("should get publication matching the ID", function(done) {
            chai.request(bookStore)
                .get('/api/getPublicationWithId?publicationId=1')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXNob2tiaGF0ekBnbWFpbC5jb20.YtWhunO5WHQMLwhv2o7XMqSoEqtfSzvbXkvFbvHaDKE')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    expect(res.body.data[0]).to.have.property("publication_name");
                    expect(res.body.data[0].publication_name).to.not.equal(null);
                    expect(res.body.data[0]).to.have.property("publication_id");
                    expect(res.body.data[0].publication_id).to.not.equal(null);
                    done();
                });

        });
    });

    describe("getPublicationWithName() ", function() {

        it("should get publication matching the Name", function(done) {
            chai.request(bookStore)
                .get('/api/getPublicationWithName?publicationName=l')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXNob2tiaGF0ekBnbWFpbC5jb20.YtWhunO5WHQMLwhv2o7XMqSoEqtfSzvbXkvFbvHaDKE')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    expect(res.body.data[0]).to.have.property("publication_name");
                    expect(res.body.data[0].publication_name).to.not.equal(null);
                    expect(res.body.data[0]).to.have.property("publication_id");
                    expect(res.body.data[0].publication_id).to.not.equal(null);
                    done();
                });

        });
    });
    describe("Insert publication", function() {

        it("should insert all supplied publications", function(done) {
            chai.request(bookStore)
                .post('/api/publication')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXNob2tiaGF0ekBnbWFpbC5jb20.YtWhunO5WHQMLwhv2o7XMqSoEqtfSzvbXkvFbvHaDKE')
                .send([{ publication_name: 'testAuthor11144a' }, { publication_name: 'testAuthor211333a' }])
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body.status).to.equal(1);
                    done();
                });

        });
    });
    describe("Insert publication fail case", function() {

        it("should insert all supplied publications", function(done) {
            chai.request(bookStore)
                .post('/api/publication')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXNob2tiaGF0ekBnbWFpbC5jb20.YtWhunO5WHQMLwhv2o7XMqSoEqtfSzvbXkvFbvHaDKE')
                .send([{ publication_names: 'testAuthor11144a' }, ])
                .end((err, res) => {
                    res.should.have.status(400);
                    expect(res.body.status).to.equal(0);
                    done();
                });

        });
    });
    describe("update publication", function() {

        it("should update publication matching id", function(done) {
            chai.request(bookStore)
                .put('/api/publication')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXNob2tiaGF0ekBnbWFpbC5jb20.YtWhunO5WHQMLwhv2o7XMqSoEqtfSzvbXkvFbvHaDKE')
                .send({ publication_name: 'Westlands', publication_id: '1' })
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body.status).to.equal(1);
                    done();
                });

        });
    });

    describe("Delete publication", function() {

        it("should  delete publication matching id", function(done) {
            chai.request(bookStore)
                .delete('/api/publication?publication_id=142')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXNob2tiaGF0ekBnbWFpbC5jb20.YtWhunO5WHQMLwhv2o7XMqSoEqtfSzvbXkvFbvHaDKE')
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body.status).to.equal(1);
                    done();
                });

        });
    });

    describe("Delete unknown publication", function() {

        it("should not delete publication matching id", function(done) {
            chai.request(bookStore)
                .delete('/api/publication?publication_id=999')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXNob2tiaGF0ekBnbWFpbC5jb20.YtWhunO5WHQMLwhv2o7XMqSoEqtfSzvbXkvFbvHaDKE')
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body.status).to.equal(0);
                    done();
                });

        });
    });

    describe("Unknow route", function() {

        it("should throw 404", function(done) {
            chai.request(bookStore)
                .get('/api/someunknowroute')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXNob2tiaGF0ekBnbWFpbC5jb20.YtWhunO5WHQMLwhv2o7XMqSoEqtfSzvbXkvFbvHaDKE')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });

        });
    });

    describe("Root route", function() {

        it("should get 200 response", function(done) {
            chai.request(bookStore)
                .get('/')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXNob2tiaGF0ekBnbWFpbC5jb20.YtWhunO5WHQMLwhv2o7XMqSoEqtfSzvbXkvFbvHaDKE')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });

        });
    });


});