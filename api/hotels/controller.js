const hotelService = require('./hotelService');
const schema = require('./../../config/schema.js');
const { errFormat, successFormat } = require('./../../libs/outputFormater');
const { validateParams } = require('./../../libs/validator');


const save = async(req, res) => {
    try {
        // input validation
        const validation = validateParams(schema.hotel.save, req.body);
        if (validation.err) {
            res.statusCode = 400;
            return res.send(errFormat('HO-CO-SAVE-01', validation.err.message));
        }
        // saving hotel
        const data = await hotelService.saveHotel(req.body);
        return res.send(successFormat('Successfully Added Hotel'));
    } catch (err) {
        res.statusCode = 500;
        return res.send(errFormat('HO-CO-SAVE-10', err.message));
    }
}

const view = async(req, res) => {
    try {
        //fetch hotels
        return res.send(await hotelService.getHotels());
    } catch (err) {
        res.statusCode = 500;
        return res.send(errFormat('HO-CO-view-10', err.message));
    }
}

const update = async(req, res) => {
    try {
        //input validation
        const validation = validateParams(schema.hotel.update, req.body);
        if (validation.err || req.params.id === undefined || req.params.id === null) {
            res.statusCode = 400;
            return res.send(errFormat('HO-CO-update-01', validation.err.message));
        }
        // updating hotel
        const data = await hotelService.updateHotel(req.params.id, req.body);
        return res.send(successFormat('Record Updated successfully'));
    } catch (err) {
        res.statusCode = 500;
        return res.send(errFormat('HO-CO-update-10', err.message));
    }
}

const del = async(req, res) => {
    try {
        // input validation
        if (req.params.id === undefined || req.params.id === null) {
            res.statusCode = 400;
            return res.send(errFormat('HO-CO-update-01', 'Object id is missing'));
        }
        return res.send(await hotelService.deleteHotel(req.params.id));
    } catch (err) {
        res.statusCode = 500;
        return res.send(errFormat('HO-CO-del-10', err.message));
    }
}

module.exports = {
    save,
    view,
    update,
    del
};