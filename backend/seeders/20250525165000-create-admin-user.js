'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface) => {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const hashedPasswordUser = await bcrypt.hash('john123', 10);

    await queryInterface.bulkInsert('Users', [
      {
        username: 'admin',
        email: 'admin@meticuly.com',
        password: hashedPassword,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'john_doe',
        email: 'john_doe@meticuly.com',
        password: hashedPasswordUser,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', { email: 'admin@meticuly.com' }, {email: 'john_doe@meticuly.com'}, {});
  },
};
