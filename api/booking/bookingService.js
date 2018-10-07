var bookingModel = require('../../libs/mongo').bookingModel;
const userService = require('../users/userService');
const roomService = require('../rooms/roomService');
const Moment = require('moment');
const { extendMoment } = require('moment-range');

const moment = extendMoment(Moment);

class bookingService {

    // Room booking
    async book(params) {
        const { UserId, HotelId, RoomNo, BookingFrom, BookingTill } = params;

        // checking user existance
        const existsUser = await userService.checkUser(UserId);
        if (!existsUser) {
            throw { message: 'User does not exists' };
        }
        // getting avaiable rooms
        const roomDetails = await roomService.getRoomDetails({ HotelId, RoomNo, BookingFrom, BookingTill });
        if (!roomDetails) {
            throw { message: 'no room avaiable' };
        }
        // date formating
        const start = moment(BookingFrom);
        const end = moment(BookingTill);
        const range = moment.range(start, end);
        let bookingData = [];

        if (roomDetails.length == range.diff('days') + 1) {

            for (let i = 0; i < roomDetails.length; i++) {
                try {
                    // status changing to booked
                    const data = await roomService.ChangeRoomStatus(roomDetails[i]._id.toString(), false);
                    bookingData.push({
                        UserId,
                        HotelId: roomDetails[i].HotelId,
                        RoomId: roomDetails[i]._id,
                        RoomNo: roomDetails[i].RoomNo,
                        Ac: roomDetails[i].Ac,
                        date: roomDetails[i].date
                    })

                } catch (error) {
                    for (let j = 0; j < i; j++) {
                        // revert the booking status
                        const result = await roomService.ChangeRoomStatus(roomDetails[j]._id.toString(), true);
                    }
                    throw "Could not book room for date(s) specified as this is room booked by other user for one of the date(s)";
                }
            }
        } else {
            throw { message: "Room is not available for given date range" };
        }
        try {
            // insert booking record
            const saveDb = await bookingModel.insertMany(bookingData);

        } catch (error) {
            for (let i = 0; i < roomDetails.length; i++) {
                // reverting the booking status
                const { err, result } = await roomService.ChangeRoomStatus(roomDetails[i]._id.toString(), true);
            }
            throw { message: 'Faile to book room' };
        }
        return 'Successfully bOOk the rOOm';
    }


}

module.exports = new bookingService();