'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userId = await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "test1",
          name: "test1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "test2",
          name: "test2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "test3",
          name: "test3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: ["id"] }
    );
    await queryInterface.bulkInsert("comments", [
      {
        text: "test1",
        createdAt: new Date(),
        updatedAt: new Date(),
        user_id: userId,
      },
      {
        text: "test2",
        createdAt: new Date(),
        updatedAt: new Date(),
        user_id: userId,
      },
      {
        text: "test3",
        createdAt: new Date(),
        updatedAt: new Date(),
        user_id: userId,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("comments", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};