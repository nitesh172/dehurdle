import React, { useState, useEffect } from "react"
import Button from "./Button"
import Input from "./Input"
import Textarea from "./Textarea"
import TextButton from "./TextButton"

function TaskModal({
  isOpen,
  onClose,
  onSubmit,
  task = null,
  title = "Create Task",
}) {
  const [taskTitle, setTaskTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("TODO")
  const [dueDate, setDueDate] = useState("")

  useEffect(() => {
    if (task) {
      setTaskTitle(task.title || "")
      setDescription(task.description || "")
      setStatus(task.status || "TODO")
      setDueDate(
        task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : "",
      )
    } else {
      setTaskTitle("")
      setDescription("")
      setStatus("TODO")
      setDueDate("")
    }
  }, [task, isOpen])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!taskTitle.trim()) return
    onSubmit({ title: taskTitle, description, status, dueDate })
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-150">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="title"
            label="Title"
            placeholder="Enter task title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
          />

          <Textarea
            id="description"
            label="Description"
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex flex-col gap-y-2">
            <label className="text-sm font-medium text-gray-700">Status</label>
            <div className="flex gap-x-2">
              {[
                {
                  value: "TODO",
                  label: "To Do",
                  activeClass: "bg-blue-50 text-blue-700 border-blue-200/80 ring-2 ring-blue-500/20",
                  inactiveClass: "bg-gray-100 text-gray-500 border border-transparent hover:bg-gray-200 hover:text-gray-700"
                },
                {
                  value: "IN_PROGRESS",
                  label: "In Progress",
                  activeClass: "bg-amber-50 text-amber-700 border-amber-200/80 ring-2 ring-amber-500/20",
                  inactiveClass: "bg-gray-100 text-gray-500 border border-transparent hover:bg-gray-200 hover:text-gray-700"
                },
                {
                  value: "DONE",
                  label: "Done",
                  activeClass: "bg-emerald-50 text-emerald-700 border-emerald-200/80 ring-2 ring-emerald-500/20",
                  inactiveClass: "bg-gray-100 text-gray-500 border border-transparent hover:bg-gray-200 hover:text-gray-700"
                }
              ].map((opt) => {
                const isActive = status === opt.value
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setStatus(opt.value)}
                    className={`flex-1 py-2.5 px-3 text-xs font-semibold rounded border text-center transition-all duration-150 cursor-pointer ${
                      isActive ? opt.activeClass : opt.inactiveClass
                    }`}
                  >
                    {opt.label}
                  </button>
                )
              })}
            </div>
          </div>

          <Input
            id="dueDate"
            label="Due Date"
            type="date"
            value={dueDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <div className="flex justify-end gap-x-2 pt-4">
            <TextButton
              type="button"
              onClick={onClose}
              title="Cancel"
              color="secondary"
            />
            <Button title="Save" type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskModal
