# Backend-API| Hotel-Room-Booking | Node.js
>### API's to Create, update, delete, search for Hotel, User, Room and booking.

## Prerequisite
```
- NODE (npm)
- MONGODB
```

## Download-Clone
```
git clone https://github.com/NitinHsharma/Hotel-Room-Booking.git
```

## Install dependencies
```
npm i
```

## Create Indexes
```
    use HotelBooking
    db.rooms.createIndex({ RoomNo: 1, HotelId: 1, Availability: 1 });
    db.rooms.createIndex({ date: 1, HotelId: 1, });

```

## Starting the api
```
npm run start
```

## Postman Collection
```
https://www.getpostman.com/collections/a4c20190e576225b46be
```
