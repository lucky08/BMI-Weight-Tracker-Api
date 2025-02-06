'use strict';

const app = require('../../app.js');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('UserProfile', function () {
  describe('/GET', () => {
    it('it should GET all the user profiles', (done) => {
      chai
        .request(app)
        .get('/user-profile')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

  describe('/GET/:id', function () {
    const userProfileId = 1; // User Profile Id
    it('it should get a user profile', (done) => {
      chai
        .request(app)
        .get('/user-profile/' + userProfileId)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('user_name');
          done();
        });
    });
  });
});
