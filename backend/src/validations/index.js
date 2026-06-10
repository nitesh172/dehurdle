const yup = require("yup")

const createTaskSchema = yup.object({
  title: yup.string().required("Title is required").trim(),
  description: yup.string().nullable().optional().default(""),
  dueDate: yup
    .date()
    .min(new Date(), "Due date cannot be in the past")
    .required("Due date is required"),
  status: yup.string().oneOf(["TODO", "IN_PROGRESS", "DONE"]).default("TODO"),
})

const updateTaskSchema = yup.object({
  title: yup.string().optional().trim(),
  description: yup.string().nullable().optional().default(""),
  status: yup.string().oneOf(["TODO", "IN_PROGRESS", "DONE"]),
})

module.exports = {
  createTaskSchema,
  updateTaskSchema,
}
