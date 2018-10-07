const bookingService = require('./bookingService');
const moment = require('moment');

const schema = require('./../../config/schema.js');
const { errFormat, successFormat } = require('./../../libs/outputFormater');
const { validateParams } = require('./../../libs/validator');

const book = async(req, res) => {
    try {

        // input validation
        const validation = validateParams(schema.book, req.body);
        if (validation.err) {
            res.statusCode = 400;
            return res.send(errFormat('HO-CO-Book-01', validation.err.message));
        }
        // custom date validation
        const err = checkInput(req.body);
        if (err) {
            res.statusCode = 400;
            return res.send(errFormat('HO-CO-Book-01', err));
        }

        // booking logic
        const data = await bookingService.book(req.body);
        return res.send(successFormat('successfully booked the room'));

    } catch (err) {
        res.statusCode = 500;
        return res.send(errFormat('HO-CO-Book-10', err.message));
    }
}

// custom date checking
checkInput = (params) => {
    let { BookingFrom, BookingTill } = params;
    bookingFrom = moment(BookingFrom);
    bookingTill = moment(BookingTill);

    if (BookingFrom > BookingTill) {
        return 'From can not able greater';
    }

    if (BookingTill - BookingFrom < 1) {
        return 'Min 1 day required';
    }

    return;
}


module.exports = {
    book
}