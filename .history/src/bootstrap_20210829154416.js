module.exports = async () => {

    const Booking = require('./models/Booking');
    const BookingList = require('./models/BookingList');
    // const Services = require('./models/Services');
    // const ServiceList = require('./models/ServiceList');
    const Staff = require('./models/Staff')
    const Client = require('./models/Client')
    const Offer = require('./models/Offer');
    const OfferList = require('./models/OfferList');
    const Review = require('./models/Review');

    const User = require('./models/User')
    const UserDetail = require('./models/UserDetail')


    Booking.hasMany(BookingList, { as : 'BookingList', foreignKey: 'bookingId'});
    BookingList.belongsTo(Booking, {as : 'Booking', foreignKey: 'bookingId'});

    Staff.hasMany(BookingList, { as : 'StaffList', foreignKey: 'staffId'})
    BookingList.belongsTo(Staff, {as : 'Staff', foreignKey: 'staffId'});

    // ServiceList.hasMany(BookingList, { as : 'BookingList', foreignKey: 'listId'})
    // BookingList.belongsTo(ServiceList, {as : 'ServiceList', foreignKey: 'listId'});

    // Services.hasMany(ServiceList, { as : 'ServiceList', foreignKey: 'serviceId'});
    // ServiceList.belongsTo(Services, {as : 'Services', foreignKey: 'serviceId'});

    Client.hasMany(Booking, { as : 'Appoinment', foreignKey: 'clientId'});
    Booking.belongsTo(Client, {as : 'ClientInfo', foreignKey: 'clientId'});

    Offer.hasMany(OfferList, { as : 'OfferList', foreignKey: 'offerId'});
    OfferList.belongsTo(Offer, {as : 'Offer', foreignKey: 'offerId'});

    Client.hasOne(Review, { as : 'Review', foreignKey: 'clientId'});
    Review.belongsTo(Client, {as : 'Client', foreignKey: 'clientId'});

}