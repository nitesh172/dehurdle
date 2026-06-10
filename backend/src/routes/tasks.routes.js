const router = require("express").Router()
const { tasksController } = require("../controllers")
const { validateSchema } = require("../middlewares")
const { createTaskSchema, updateTaskSchema } = require("../validations")

router.get("/", tasksController.getTasks)
router.get("/:id", tasksController.getTask)
router.post("/", validateSchema(createTaskSchema), tasksController.createTask)
router.patch(
  "/:id",
  validateSchema(updateTaskSchema),
  tasksController.updateTask,
)
router.delete("/:id", tasksController.deleteTask)

module.exports = router
