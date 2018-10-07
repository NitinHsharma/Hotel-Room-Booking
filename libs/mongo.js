const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Config = require('../config/config.json');

// ConnectionString
const dbHost = Config.db_config.host;
mongoose.Promise = global.Promise;

// Connection function
var connectWithRetry = function() {
    mongoose.connect(dbHost, { server: { auto_reconnect: true, reconnectTries: 2, useNewUrlParser: true, useNewUrlParser: true } }, function(err) {
        if (err) {
            console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
            setTimeout(connectWithRetry, 5000);
        }
    });
};

// calling connection
connectWithRetry();

// connection success event
mongoose.connection.on('connected', function() {
    console.log("Connected");
})

// connection error event
mongoose.connection.on('error', function(err) {
    console.log('Mongoose default connection error: ' + err);
});

// connection disconnected event
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose default connection disconnected');

});


// Room Schema
const room = new Schema({
    RoomNo: { type: Number },
    HotelId: { type: String },
    Ac: { type: Boolean, default: false },
    Price: { type: Number, default: 100 },
    Availability: { type: Boolean, default: true },
    date: { type: Date }
});

// Hotel Schema
const hotel = new Schema({
    Name: { type: String },
    Ratting: { type: Number },
    Address: { type: String },
    Active: { type: Boolean, default: true },

});

// booking schema
const booking = new Schema({
    HotelId: { type: String },
    RoomId: { type: String },
    UserId: { type: String },
    BookingDate: { type: Date, default: Date.now }

});

// user schema
const user = new Schema({
    Name: { type: String },
    Email: { type: String },
    Phone: { type: Number, default: 0 },
    Gender: { type: String }
});

// export schema
module.exports = {
    userModel: mongoose.model('userSchema', user, 'users'),
    hotelModel: mongoose.model('hotelSchema', hotel, 'hotels'),
    roomModel: mongoose.model('roomSchema', room, 'rooms'),
    bookingModel: mongoose.model('bookingSchema', booking, 'bookings')
};