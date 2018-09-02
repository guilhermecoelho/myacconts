import codes from './httpStatusCodes';

exports.getSuccess = function (res, content) {
    successDetailJson(res, codes.SuccessCodes.OK, content);
};

exports.getFail = function (res, err) {
    failJson(res, codes.ErrorCodes.BAD_REQUEST, err);
};

exports.createSuccess = function (res, content) {
    successJson(res, codes.SuccessCodes.CREATED, content);
};

exports.createFail = function (res, err) {
    failJson(res, codes.ErrorCodes.UNPROCESSABLE, err);
};

exports.updateSuccess = function (res, content) {
    successJson(res, codes.SuccessCodes.OK, content);
};

exports.updateFail = function (res, err) {
    failJson(res, codes.ErrorCodes.UNPROCESSABLE, err);
};

exports.removeSuccess = function (res, content) {
    successJson(res, codes.SuccessCodes.NO_CONTENT, content);
};

exports.removeFail = function (res, err) {
    failJson(res, codes.ErrorCodes.BAD_REQUEST, err);
};

exports.authFail = function (res) {
    const err = {
        message: "Auth fail"
    };
    failJson(res, codes.ErrorCodes.UNAUTHORIZED, err);
}

//generic methods

exports.customResponse = function (res, status, content) {
    res.status(status).json({ content });
}

function successJson(res, status, content) {
    res.status(status).json({
        result: content
    });
}

function successDetailJson(res, status, content) {
    res.status(status).json({
        count: content.length,
        items: content
    });
}

function failJson(res, status, err) {
    res.status(status).json({
        error: err.message
    });
}



