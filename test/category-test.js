var expect = require("chai").expect;
var chai = require("chai");
var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);
var bookStore = require("../app");

describe("Category APIS", function() {
    this.timeout(5000);
    describe("getAllCategories() ", function() {

        it("should return all Categories in DB in proper format", function(done) {
            chai.request(bookStore)
                .get('/api/categories')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXNob2tiaGF0ekBnbWFpbC5jb20.YtWhunO5WHQMLwhv2o7XMqSoEqtfSzvbXkvFbvHaDKE')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    expect(res.body.data[0]).to.have.property("category_name");
                    expect(res.body.data[0].category_name).to.not.equal(null);
                    expect(res.body.data[0]).to.have.property("category_id");
                    expect(res.body.data[0].category_id).to.not.equal(null);
                    done();
                });

        });
    });

    describe("getCategoryWithId() ", function() {

        it("should get category matching the ID", function(done) {
            chai.request(bookStore)
                .get('/api/getCategoryWithId?category_id=1')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXNob2tiaGF0ekBnbWFpbC5jb20.YtWhunO5WHQMLwhv2o7XMqSoEqtfSzvbXkvFbvHaDKE')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    expect(res.body.data[0]).to.have.property("category_name");
                    expect(res.body.data[0].category_name).to.not.equal(null);
                    expect(res.body.data[0]).to.have.property("category_id");
                    expect(res.body.data[0].category_id).to.not.equal(null);
                    done();
                });

        });
    });

    describe("getCategoryWithName() ", function() {

        it("should get category matching the Name", function(done) {
            chai.request(bookStore)
                .get('/api/getCategoryWithName?category_name=f')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXNob2tiaGF0ekBnbWFpbC5jb20.YtWhunO5WHQMLwhv2o7XMqSoEqtfSzvbXkvFbvHaDKE')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    expect(res.body.data[0]).to.have.property("category_name");
                    expect(res.body.data[0].category_name).to.not.equal(null);
                    expect(res.body.data[0]).to.have.property("category_id");
                    expect(res.body.data[0].category_id).to.not.equal(null);
                    done();
                });

        });
    });
    describe("Insert category", function() {

        it("should insert all supplied categories", function(done) {
            chai.request(bookStore)
                .post('/api/category')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXNob2tiaGF0ekBnbWFpbC5jb20.YtWhunO5WHQMLwhv2o7XMqSoEqtfSzvbXkvFbvHaDKE')
                .send([{ category_name: 'testAuthor11144a' }, { category_name: 'testAuthor211333a' }])
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body.status).to.equal(1);
                    done();
                });

        });
    });
    describe("Insert category fail case", function() {

        it("should insert all supplied categories", function(done) {
            chai.request(bookStore)
                .post('/api/category')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXNob2tiaGF0ekBnbWFpbC5jb20.YtWhunO5WHQMLwhv2o7XMqSoEqtfSzvbXkvFbvHaDKE')
                .send([{ publication_names: 'testAuthor11144a' }, ])
                .end((err, res) => {
                    res.should.have.status(400);
                    expect(res.body.status).to.equal(0);
                    done();
                });

        });
    });
    describe("update category", function() {

        it("should update category matching id", function(done) {
            chai.request(bookStore)
                .put('/api/category')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXNob2tiaGF0ekBnbWFpbC5jb20.YtWhunO5WHQMLwhv2o7XMqSoEqtfSzvbXkvFbvHaDKE')
                .send({ category_name: 'Science Fiction', category_id: '1' })
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body.status).to.equal(1);
                    done();
                });

        });
    });

    describe("Delete category", function() {

        it("should  delete category matching id", function(done) {
            chai.request(bookStore)
                .delete('/api/category?category_id=0')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXNob2tiaGF0ekBnbWFpbC5jb20.YtWhunO5WHQMLwhv2o7XMqSoEqtfSzvbXkvFbvHaDKE')
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body.status).to.equal(1);
                    done();
                });

        });
    });

    describe("Delete unknown category", function() {
        it("should not delete category matching id", function(done) {
            chai.request(bookStore)
                .delete('/api/category?category_id=999')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.YXNob2tiaGF0ekBnbWFpbC5jb20.YtWhunO5WHQMLwhv2o7XMqSoEqtfSzvbXkvFbvHaDKE')
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body.status).to.equal(0);
                    done();
                });

        });
    });



});