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


describe('wrong searches', () => {
    it('should return a 400 when given a wrong search keyword', () => {
        return request(app)
            .get('/apps')
            .query({ sorting: 'Nope!' })
            .expect(400)
    })

    it('should return a 400 when given a wrong genre', () => {
        return request(app)
            .get('/apps')
            .query({ genre: 'Try again!' })
            .expect(400)
    })
})


