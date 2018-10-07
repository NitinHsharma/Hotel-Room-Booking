var hotelModel = require('../../libs/mongo').hotelModel;


class HotelService {

    // save hotel
    async saveHotel(hotelDetails) {
        const hotel = new hotelModel(hotelDetails);
        return await hotel.save();
    }

    // get hotel
    async getHotels() {
        return await hotelModel.find({});
    }

    // update hotel
    async updateHotel(hotelId, hotelDetails) {
        return await hotelModel.findOneAndUpdate({ '_id': hotelId }, hotelDetails);
    }

    // delete hotel
    async deleteHotel(hotelId) {
        return await hotelModel.findOneAndRemove({ '_id': hotelId });
    }
}

module.exports = new HotelService();