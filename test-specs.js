var expect = require("chai").expect;
var tools = require("../lib/tools");
var nock = require('nock');
describe("Tools", function() {

    describe("printName()", function() {
        it("should print the last name first", function() {
            var results = tools.printName({ first: "Ashok", last: "Bhat" });
            expect(results).to.equal("Bhat, Ashok");
        });
    });

    describe("loadWiki()", function() {
        //this.timeout(5000);
        before(function() {
            nock("https://en.wikipedia.org")
                .get("/wiki/Abraham_Lincoln")
                .reply(200, "Abraham Lincoln Page");
        });


        it("Load Abrham Lincons Wikipidea page", function(done) {
            tools.loadWiki({ first: "Abraham", last: "Lincoln" }, function(html) {
                expect(html).to.be.ok;
                done();
            })
        });
    });
});