import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import responseModels from '../commons/response';

class UsersController {
    constructor(User) {
        this.User = User;
    };

    create(req, res) {
        this.User.find({ email: req.body.email })
            .exec()
            .then(user => {
                if (user.length >= 1) {
                    return responseModels.customResponse(res, 500, { message: "email already registered" });
                } else {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) {
                            responseModels.createFail(res, err);
                        } else {
                            const user = new this.User({
                                email: req.body.email,
                                password: hash
                            });
                            user.save()
                                .then(doc => responseModels.createSuccess(res, doc))
                                .catch(err => responseModels.createFail(res, err));
                        }
                    });
                }
            });
    }

    login(req, res) {
        this.User.find({ email: req.body.email })
            .exec()
            .then(user => {
                if (user.length < 1) {
                    return responseModels.authFail(res);
                }
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        return responseModels.authFail(res);
                    }
                    if (result) {
                        const token = jwt.sign(
                            {
                                email: user[0].email,
                                id: user[0]._id
                            },
                            'secret',//process.env.JWT_KEY,
                            {
                                expiresIn: '1h'
                            }
                        );
                        return responseModels.getSuccess(res, {
                            message: "Auth success",
                            token: token
                        });
                    }
                    return responseModels.authFail(res);
                });
            })
            .catch(err => responseModels.authFail(res));
    }

    remove(req, res) {
        return this.User.remove({ _id: req.params.id })
            .then(doc => responseModels.removeSuccess(res, doc))
            .catch(err => responseModels.removeFail(res, err));
    }
}

export default UsersController; 