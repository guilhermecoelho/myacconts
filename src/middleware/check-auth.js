import request from 'request';
import responseModels from 'httpstatusresponse';

require('dotenv').config();

module.exports = (req, res, next) => {

    return request.post({
        headers: { "content-type": "application/json", "Authorization": "Beare " + req.headers.authorization.split(' ')[1] },
        "url": "http://localhost:3001/api/v1/checkauth/",

    },
        (error, response, body) => {
            if (error) {
                return responseModels.authFail(res);
            }
            if (response.statusCode == 401) {
                return responseModels.authFail(res);
            } else {
                next();
            }

        });
};