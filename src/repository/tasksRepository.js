const { Task } = require("../db/models/index");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

class TasksRepository {
  async listAllTasks(offset, limit) {
    return Task.findAll({
      attributes: ["id", "title"],
      offset: offset,
      limit: limit,
      where: {
        deletedAt: null,
      },
    });
  }

  async listAllTasksSoftDeleted(offset, limit) {
    return Task.findAll({
      attributes: ["id", "title"],
      offset: offset,
      limit: limit,
      where: {
        deletedAt: {
          [Op.not]: null,
        },
      },
    });
  }

  async findTaskById(id) {
    return Task.findOne({
      attributes: ["title", "description", "due_date", "completed", "deletedAt"],
      where: {
        id: id,
      },
    });
  }

  async createTask(title, description, due_date, completed) {
    return Task.create({
      attributes: ["title", "description", "due_date", "completed"],
      id: uuidv4(),
      title: title,
      description: description,
      due_date: due_date,
      completed: completed,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async softDeleteTask(id) {
    return Task.update(
      {
        deletedAt: new Date(),
      },
      {
        where: {
          id: id,
        },
      }
    );
  }

  async deleteTask(id) {
    return Task.destroy({ where: { id } });
  }
}

module.exports = TasksRepository;
