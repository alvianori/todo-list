const express = require("express");
const tasksRouter = require("./tasksRouter");
const router = express.Router();

router.use("/Tasks", tasksRouter);

module.exports = router;
