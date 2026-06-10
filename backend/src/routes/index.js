const router = require("express").Router()
const { StatusCodes } = require("http-status-codes")
const authRoutes = require("./auth.routes")
const userRoutes = require("./user.routes")
const tasksRoutes = require("./tasks.routes")
const { auth } = require("../middlewares")

router.get("/health", (req, res) => {
  res.status(StatusCodes.OK).json({ message: "Health is good" })
})

router.use("/auth", authRoutes)
router.use("/user", auth, userRoutes)
router.use("/tasks", auth, tasksRoutes)

module.exports = router
