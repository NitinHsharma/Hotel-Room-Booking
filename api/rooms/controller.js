const roomService = require('./roomService');
const schema = require('./../../config/schema.js');
const { errFormat, successFormat } = require('./../../libs/outputFormater');
const { validateParams } = require('./../../libs/validator');


const save = async(req, res) => {
    try {
        // Input validation
        const validation = validateParams(schema.room.save, req.body);
        if (validation.err) {
            res.statusCode = 400;
            return res.send(errFormat('RO-CO-SAVE-01', validation.err.message));
        }
        // saving room
        const data = await roomService.saveRoom(req.body);
        return res.send(successFormat(data));
    } catch (err) {
        res.statusCode = 500;
        return res.send(errFormat('RO-CO-SAVE-10', err.message));
    }

}

const view = async(req, res) => {
    try {
        // input validation
        if (req.params.id === undefined || req.params.id === null,
            req.params.from === undefined || req.params.from === null,
            req.params.to === undefined || req.params.to === null) {
            res.statusCode = 400;
            return res.send(errFormat('RO-CO-SAVE-01', 'Room id is missing'));
        }

        // getting rooms
        return res.send(await roomService.getAvaiableRooms({ id: req.params.id, from: req.params.from, to: req.params.to }));
    } catch (err) {
        res.statusCode = 500;
        return res.send(errFormat('RO-CO-SAVE-10', err.message));
    }
}


module.exports = {
    save,
    view
};