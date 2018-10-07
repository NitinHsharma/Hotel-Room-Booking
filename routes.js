const hotelsController = require('./api/hotels/controller');
const roomsController = require('./api/rooms/controller');
const UserController = require('./api/users/controller');
const bookingController = require('./api/booking/controller');

module.exports = function(app) {

    /*
     *
     * Hotel Routes
     * 
     */
    app.get('/viewHotels', hotelsController.view);

    app.post('/saveHotel', hotelsController.save);

    app.put('/updateHotel/:id', hotelsController.update);

    app.delete('/deleteHotel/:id', hotelsController.del);


    /*
     *
     * Room Routes
     * 
     */
    app.get('/viewRooms/:id/:from/:to', roomsController.view);

    app.post('/saveRoom', roomsController.save);


    /*
     *
     * User Routes
     * 
     */

    app.get('/viewUsers', UserController.view);

    app.post('/saveUser', UserController.save);

    app.put('/updateUser/:id', UserController.update);

    app.delete('/deleteUser/:id', UserController.del);

    /*
     *
     * Booking Routes
     * 
     */

    app.post('/book', bookingController.book);

}