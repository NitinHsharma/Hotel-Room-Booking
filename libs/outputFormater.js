// error output formater
const error = (errcode, message) => {
    return ({
        errcode,
        message,
        result: null
    });
}

// success output formater
const success = (result) => {
    return ({
        errcode: null,
        errmessage: null,
        result
    })
}

module.exports = {
    errFormat: error,
    successFormat: success
}