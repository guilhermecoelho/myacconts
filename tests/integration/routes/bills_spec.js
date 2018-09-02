import Bill from "../../../src/models/bill";

describe('Routes: Bills', () => {
    let request;
    let token;


    before(() => {
        return setupApp()
            .then(app => {
                request = supertest(app);

                request
                    .post('/users/login')
                    .send({
                        email: 'email3@teste.com',
                        password: '123'
                    })
                    .end((err, res) => {
                        token = res.body.items.token
                    });
            });
    });

    const defaultId = '56cb91bdc3464f14678934ca';
    const defaultDate = new Date();

    const defaultBill = {
        name: 'defautl bill',
        description: 'bill description',
        price: 100,
        date: defaultDate
    };

    const expectedBill = {
        count: 1,
        items: [{
            __v: 0,
            _id: defaultId,
            name: 'defautl bill',
            description: 'bill description',
            price: 100,
            date: defaultDate.toISOString()
        }]
    };

    beforeEach(() => {
        const bill = new Bill(defaultBill);
        bill._id = '56cb91bdc3464f14678934ca';
        return Bill.remove({})
            .then(() => bill.save());

    });

    afterEach(() => Bill.remove({}));

    describe('GET /bills', () => {
        it('should return a list of bills', done => {
            request
                .get('/bills')
                .set('Authorization', 'Beare ' + token)
                .end((err, res) => {
                    expect(res.body).to.eql(expectedBill);
                    done(err);
                });
        });
        context('when an id is specified', done => {
            it('shoud return status 200 with one bill', done => {
                request
                    .get('/bills/' + defaultId)
                    .set('Authorization', 'Beare ' + token)
                    .end((err, res) => {
                        expect(res.statusCode).to.eql(200);
                        expect(res.body).to.eql(expectedBill);
                        done(err);
                    });
            });
        })
    });

    describe('POST /bills', () => {
        context('when post a bill', () => {
            it('should return a new bill and status 201', done => {
                const customId = '56cb91bdc3464f14678934ba'
                const newBill = Object.assign({}, {
                    _id: customId,
                    __v: 0,
                },
                    defaultBill
                );

                const expecteSaveddBill = {
                    _id: customId,
                    __v: 0,
                    name: 'defautl bill',
                    description: 'bill description',
                    price: 100,
                    date: defaultDate.toISOString()
                };

                request
                    .post('/bills')
                    .set('Authorization', 'Beare ' + token)
                    .send(newBill)
                    .end((err, res) => {
                        expect(res.statusCode).to.eql(201);
                        expect(res.body).to.eql(expecteSaveddBill);
                        done(err);
                    });
            });
        });
    });

    describe('PUT /bills', () => {
        context('when editing a bill', () => {
            it('should update the bill and return status 200', done => {
                const customBill = {
                    name: 'Custom Bill'
                }
                const updateBill = Object.assign({}, { customBill, defaultBill });

                request
                    .put('/bills/' + defaultId)
                    .set('Authorization', 'Beare ' + token)
                    .send(updateBill)
                    .end((err, res) => {
                        expect(res.statusCode).to.eql(200);
                        done(err);
                    });
            });
        });
    });

    describe('DELETE /bills', () => {
        context('when delete a bill', () => {
            it('should delete the bill and return status 204', done => {
                request
                    .delete('/bills/' + defaultId)
                    .set('Authorization', 'Beare ' + token)
                    .end((err, res) => {
                        expect(res.statusCode).to.eql(204);
                        done(err);
                    });
            });
        });
    });
}); 