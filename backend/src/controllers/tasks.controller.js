const { StatusCodes } = require("http-status-codes")
const { TasksService } = require("../services")
const tasksService = new TasksService()

const getTask = async (req, res) => {
  try {
    const taskId = req.params.id
    const task = await tasksService.getTask(taskId)
    if (!task) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Task not found" })
    }

    res.status(StatusCodes.OK).json(task)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

const getTasks = async (req, res) => {
  try {
    const filter = {}
    if (req.query.status) {
      filter.status = req.query.status
    }
    const tasks = await tasksService.getTasks(filter)
    res.status(StatusCodes.OK).json(tasks)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

const createTask = async (req, res) => {
  try {
    const task = await tasksService.createTask(req.body)
    res.status(StatusCodes.CREATED).json(task)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id
    const task = await tasksService.getTask(taskId)
    if (!task) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Task not found" })
    }

    const updatedTask = await tasksService.updateTask(taskId, req.body)
    res.status(StatusCodes.OK).json(updatedTask)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id
    const task = await tasksService.getTask(taskId)
    if (!task) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Task not found" })
    }

    await tasksService.deleteTask(taskId)
    res.status(StatusCodes.OK).json({ message: "Task deleted successfully" })
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

module.exports = { getTask, getTasks, createTask, updateTask, deleteTask }
