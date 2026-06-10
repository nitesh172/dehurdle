const router = require("express").Router()
const { StatusCodes } = require("http-status-codes")
const tasksRoutes = require("./tasks.routes")

router.get("/health", (req, res) => {
  res.status(StatusCodes.OK).json({ message: "Health is good" })
})

router.use("/tasks", tasksRoutes)

module.exports = router
