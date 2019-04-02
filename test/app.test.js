const app = require('../app');
const expect = require('chai').expect;
const request = require('supertest');

describe('Playstore app', () => {
    it('should return a 200 ok response', () => {
        request(app)
            .get('/apps')
            .expect(200);
    });

    it('should return an array', () => {
        request(app)
            .get('/apps')
            .expect('Content-Type', 'application/json')
            .then(res => {
                expect(res.body).to.be('array');
            });
    });
});



