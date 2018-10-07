module.exports = {
    "hotel": {
        "save": {
            "Name": { type: 'string', default: null },
            "Ratting": { type: 'number', default: null },
            "Address": { type: 'string', default: null }
        },
        "update": {
            "Name": { type: 'string', default: null },
            "Ratting": { type: 'number', default: null },
            "Address": { type: 'string', default: null }
        }
    },
    "room": {
        "save": {
            "RoomNo": { type: 'number', default: null },
            "HotelId": { type: 'string', default: null },
            "Ac": { type: 'boolean', default: null },
            "date": { type: 'string', default: null },
            "Price": { type: 'number', default: null },
            "Availability": { type: 'boolean', default: null }
        },
        "view": {
            "from": { type: 'string', default: null },
            "to": { type: 'string', default: null }
        }
    },
    "user": {
        "save": {
            "Name": { type: 'string', default: null },
            "Email": { type: 'string', default: null },
            "Phone": { type: 'number', default: null },
            "Gender": { type: 'string', default: null }
        },
        "update": {
            "Name": { type: 'string', default: null },
            "Email": { type: 'string', default: null },
            "Phone": { type: 'number', default: null },
            "Gender": { type: 'string', default: null }
        }
    },
    "book": {
        "HotelId": { type: 'string', default: null },
        "UserId": { type: 'string', default: null },
        "RoomNo": { type: 'number', default: null },
        "BookingFrom": { type: 'string', default: null },
        "BookingTill": { type: 'string', default: null }
    }
}