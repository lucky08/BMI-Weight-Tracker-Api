"use strict";

const app = require("../../app.js");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

describe("Device", function () {
  describe("/GET", () => {
    it("it should GET all the devices", (done) => {
      chai
        .request(app)
        .get("/device")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });

  describe("/GET/:id", function () {
    const deviceId = 1; // Device Id
    it("it should get a device", (done) => {
      chai
        .request(app)
        .get("/device/" + deviceId)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("id");
          res.body.should.have.property("name");
          done();
        });
    });
  });
});
