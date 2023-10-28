const TasksRepository = require("../repository/tasksRepository");

const tasksRepository = new TasksRepository();

const getAllTasks = async (req, res) => {
  try {
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || undefined;
    const response = await tasksRepository.listAllTasks(offset, limit);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getAllTasksSoftDeleted = async (req, res) => {
  try {
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || undefined;
    const response = await tasksRepository.listAllTasksSoftDeleted(offset, limit);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const response = await tasksRepository.findTaskById(taskId);
    if (!response) return res.status(404).json({ msg: `Task Not Found!` });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const createTask = async (req, res) => {
  const { title, description, due_date, completed } = req.body;
  try {
    const response = await tasksRepository.createTask(title, description, due_date, completed);
    res.status(201).json({ msg: "Add Task Successfully", user: response });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const softDeleteTask = async (req, res) => {
  const taskId = req.params.id;
  const task = await tasksRepository.findTaskById(taskId);
  if (!task) return res.status(404).json({ msg: `task Not Found!` });

  try {
    await tasksRepository.softDeleteTask(taskId);
    res.status(200).json({ msg: `Task with ID ${req.params.id} Has Soft Deleted` });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  const task = await tasksRepository.findTaskById(taskId);
  if (!task) return res.status(404).json({ msg: `task Not Found!` });

  try {
    await tasksRepository.deleteTask(taskId);
    res.status(200).json({ msg: `Task with ID ${req.params.id} Deleted Permanently` });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = { getAllTasks, getAllTasksSoftDeleted, getTaskById, createTask, softDeleteTask, deleteTask };
