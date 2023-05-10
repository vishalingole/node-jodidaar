'use strict';

module.exports = {
	up: async(queryInterface, Sequelize) => {

		await queryInterface.createTable('order_status', {
			id: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: Sequelize.STRING(55),
				allowNull: false,
			},
			createdAt: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW
			},
			updatedAt: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW
			},
		});

		return queryInterface.bulkInsert('order_status', [{
         name: 'Pending',
         createdAt: new Date(), 
         updatedAt: new Date()
			}, {
        name: 'Rescheduled',
         createdAt: new Date(), 
         updatedAt: new Date()
			}, {
        name: 'Packed',
        createdAt: new Date(), 
        updatedAt: new Date()
			}, {
        name: 'Shipped',
        createdAt: new Date(), 
        updatedAt: new Date()
			}, {
        name: 'Hold',
        createdAt: new Date(), 
        updatedAt: new Date()
			}, {
        name: 'Token Pending',
        createdAt: new Date(), 
        updatedAt: new Date()
			},
			{
        name: 'Courier Returned',
        createdAt: new Date(), 
        updatedAt: new Date()
			}, {
        name: 'Delivered',
        createdAt: new Date(), 
        updatedAt: new Date()
			}, {
        name: 'Cancelled',
        createdAt: new Date(), 
        updatedAt: new Date()
			}, {
        name: 'Expired',
        createdAt: new Date(), 
        updatedAt: new Date()
			}, {
        name: 'Processing',
        createdAt: new Date(), 
        updatedAt: new Date()
			}
		], {});
	},

	down: async(queryInterface, Sequelize) => {
		await queryInterface.dropTable('order_status');
	}
};