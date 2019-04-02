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
            .expect('Content-Type', /json/)
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
            .query({ genre: 'Wrong genre' })
            .expect(400)
    })
})


//a for loop loops through the entire array before stopping. a while loop will stop immediately when there is a problem: look at syntax from checkpoint/5. notice how there are variables declared outside of the loop
//could be solved with a for loop (research this syntax)

it('should sort by a rating', () => {
    request(app)
        .get('/apps')
        .query({ sorting: 'Rating' })
        .expect(200)
        .then(res => {
            let i = 0;
            let sorted = true;
            while (sorted && i < res.body.length - 1) {
                sorted = res.body[i].Rating >= res.body[i + 1].Rating;
                i++;
            }
            expect(sorted).to.be.true;
        })
})

it('if sorted by app should return apps in right sequence', () => {
    request(app)
        .get('/apps')
        .query({ sorting: 'App' })
        .expect(200)
        .then(res => {
            let i = 0;
            let sorted = true;
            while (sorted && i < res.body.length - 1) {
                sorted = res.body[i].Rating >= res.body[i + 1].Rating;
                i++;
            }
            expect(sorted).to.be.true;
        })
})
