var roomModel = require('../../libs/mongo').roomModel;

class RoomServices {

    // saves room
    async saveRoom(roomDetails) {
        const room = new roomModel(roomDetails);
        return await room.save();
    }

    // get room by id
    async getRoomById(hotelId, roomNo) {
        return await roomModel.findOne({ 'HotelId': hotelId, 'RoomNo': roomNo });
    }

    // gets all avaiable rooms
    async getAvaiableRooms(params) {
        const { id, from, to } = params;

        return await roomModel.find({ 'HotelId': id, 'date': { $gte: from, $lte: to }, 'Availability': true });
    }

    // gets room details for booking
    async getRoomDetails(params) {
        const { HotelId, RoomNo, BookingFrom, BookingTill } = params
        return await roomModel.find({
            HotelId: HotelId,
            RoomNo: RoomNo,
            date: { $gte: BookingFrom, $lte: BookingTill },
            Availability: true
        })

    }

    // update room status
    async ChangeRoomStatus(roomId, status) {

        return await roomModel.findOneAndUpdate({ '_id': roomId }, { $set: { Availability: status } });

    }

}

module.exports = new RoomServices();