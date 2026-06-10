const { Tasks } = require("../models")

module.exports = class TaskService {
  async getTask(taskId) {
    const task = await Tasks.findById(taskId).populate(
      "createdBy",
      "name email",
    )
    return task
  }

  async getTasks(filter) {
    return await Tasks.find(filter).populate("createdBy", "name email")
  }

  async createTask(taskPayload) {
    const task = new Tasks(taskPayload)
    await task.save()
    return task
  }

  async updateTask(taskId, updatePayload) {
    const task = await Tasks.findByIdAndUpdate(taskId, updatePayload, {
      new: true,
    }).populate("createdBy", "name email")
    return task
  }

  async deleteTask(taskId) {
    await Tasks.findByIdAndDelete(taskId)
  }
}
