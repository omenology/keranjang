module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("user", [
      {
        id: "4abdfdf0-43d7-47d4-bdc5-981ddbbe0ace",
        username: "user1",
        email: "email1@mail.com",
        password: "password1",
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "ec14b11e-9155-4441-b9a7-361fa4be2f5d",
        username: "user2",
        email: "email2@mail.com",
        password: "password2",
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("user", null, {});
  },
};
