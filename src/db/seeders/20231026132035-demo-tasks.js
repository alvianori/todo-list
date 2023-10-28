"use strict";
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Tasks",
      [
        {
          id: uuidv4(),
          title: "Tugas pertama",
          description: "Ini adalah deskripsi tugas pertama",
          due_date: "2023-10-30",
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          title: "Tugas kedua",
          description: "Ini adalah deskripsi tugas kedua",
          due_date: "2023-11-15",
          completed: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Tasks", null, {});
  },
};
