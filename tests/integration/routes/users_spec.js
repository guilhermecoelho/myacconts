import User from "../../../src/models/user";

describe('Routes: Users', () => {
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

    const defaultUser = {
        email: 'emailtest@test.com',
        password: '123'
    };

    const expectedUser = {
        _id: defaultId,
        email: 'emailtest@test.com',
    };

    beforeEach(() => {
        const user = new User(defaultUser);
        user._id = '56cb91bdc3464f14678934ca';
        return User.remove({})
            .then(() => user.save());

    });

    afterEach(() => User.remove({}));

    describe('POST /users', () => {
        context('when post a user', () => {
            it('should return a new user and status 201', done => {
                const customId = '56cb91bdc3464f14678934ba'
                const newUser = Object.assign({}, {
                    _id: customId,
                    __v: 0,
                },
                    defaultUser
                );

                const expecteSavedUser = {
                    _id: customId,
                    email: 'emailtest@test.com'
                };

                request
                    .post('/users')
                    .set('Authorization', 'Beare ' + token)
                    .send(newUser)
                    .end((err, res) => {
                        console.log(err)
                        expect(res.statusCode).to.eql(201);
                        expect(res.body).to.eql(expecteSavedUser);
                        done(err);
                    });
            });
        });
    });

    // describe('DELETE /users', () => {
    //     context('when delete a bill', () => {
    //         it('should delete the bill and return status 204', done => {
    //             request
    //                 .delete('/bills/' + defaultId)
    //                 .set('Authorization', 'Beare ' + token)
    //                 .end((err, res) => {
    //                     expect(res.statusCode).to.eql(204);
    //                     done(err);
    //                 });
    //         });
    //     });
    // });
}); 