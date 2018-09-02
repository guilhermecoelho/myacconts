import jwt from 'jsonwebtoken';

import responseModels from '../commons/response';

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, "secret");
        req.userData = decode;
        next();
    }  catch(err){
        return responseModels.authFail(res);
    }
};