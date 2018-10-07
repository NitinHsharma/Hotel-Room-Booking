const userService = require('./userService');
const schema = require('./../../config/schema.js');
const { errFormat, successFormat } = require('./../../libs/outputFormater');
const { validateParams } = require('./../../libs/validator');

const save = async(req, res) => {
    try {

        // input validation
        const validation = validateParams(schema.user.save, req.body);
        if (validation.err) {
            res.statusCode = 400;
            return res.send(errFormat('US-CO-SAVE-01', validation.err.message));
        }
        // save
        const data = await userService.saveUser(req.body);
        return res.send(successFormat(data));
    } catch (err) {
        res.statusCode = 500;
        return res.send(errFormat('US-CO-SAVE-10', err.message));
    }
}

const view = async(req, res) => {
    try {
        return res.send(await userService.getUsers());
    } catch (err) {
        res.statusCode = 500;
        return res.send(errFormat('US-CO-view-10', err.message));
    }
}


const update = async(req, res) => {
    try {
        // input validation
        const validation = validateParams(schema.user.save, req.body);
        if (validation.err || req.params.id === undefined || req.params.id === null) {
            res.statusCode = 400;
            const err = validation.err ? validation.err : 'User id is missing';
            return res.send(errFormat('US-CO-update-01', err));
        }
        // update logic
        const data = await userService.updateUser(req.params.id, req.body);
        return res.send(successFormat(data));
    } catch (err) {
        res.statusCode = 500;
        return res.send(errFormat('US-CO-update-10', err.message));
    }
}

const del = async(req, res) => {
    try {
        // input validation
        if (req.params.id === undefined || req.params.id === null) {
            res.statusCode = 400;
            return res.send(errFormat('US-CO-del-01', 'User id is missing'));
        }
        // delete logic
        return res.send(await userService.deleteUser(req.params.id));
    } catch (err) {
        res.statusCode = 500;
        return res.send(errFormat('US-CO-del-10', err.message));
    }
}


module.exports = {
    save,
    view,
    update,
    del
};