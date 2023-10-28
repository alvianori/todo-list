const express = require("express");
const tasks = require("../controller/taskController");
const router = express.Router();

router.get("/", tasks.getAllTasks);
router.get("/deleted", tasks.getAllTasksSoftDeleted);
router.get("/:id", tasks.getTaskById);
router.post("/", tasks.createTask);
router.patch("/:id", tasks.softDeleteTask);
router.delete("/:id", tasks.deleteTask);

module.exports = router;
