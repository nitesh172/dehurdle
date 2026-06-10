import React from "react"
import TextButton from "./TextButton"

function TaskCard({ task, currentUser, onEdit, onDelete, onComplete }) {
  const creatorId =
    task.createdBy &&
    (typeof task.createdBy === "object"
      ? task.createdBy._id || task.createdBy.id
      : task.createdBy)

  const canModify =
    currentUser &&
    (currentUser.role === "admin" ||
      creatorId === currentUser._id ||
      creatorId === currentUser.id)

  const isOwnTask =
    currentUser &&
    (creatorId === currentUser._id || creatorId === currentUser.id)
  const creatorName =
    task.createdBy && typeof task.createdBy === "object"
      ? isOwnTask
        ? "You"
        : task.createdBy.name
      : "Unknown"

  const isDone = task.status === "DONE"

  const getStatusConfig = (status) => {
    switch (status) {
      case "TODO":
        return {
          bg: "bg-blue-50 text-blue-700 border border-blue-200/60",
          dot: "bg-blue-500",
          label: "Todo",
        }
      case "IN_PROGRESS":
        return {
          bg: "bg-amber-50 text-amber-700 border border-amber-200/60",
          dot: "bg-amber-500",
          label: "In Progress",
        }
      case "DONE":
        return {
          bg: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
          dot: "bg-emerald-500",
          label: "Done",
        }
      default:
        return {
          bg: "bg-gray-50 text-gray-600 border border-gray-200/60",
          dot: "bg-gray-400",
          label: status,
        }
    }
  }

  const statusConfig = getStatusConfig(task.status)

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
      <div className="space-y-4">
        <div className="flex justify-between items-start gap-x-3">
          <h4
            className={`font-ubuntu font-bold text-lg text-gray-900 line-clamp-2 leading-snug ${
              isDone ? "text-gray-400 line-through decoration-gray-300" : ""
            }`}
          >
            {task.title}
          </h4>
          <span
            className={`inline-flex items-center gap-x-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${statusConfig.bg}`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`}
            ></span>
            {statusConfig.label}
          </span>
        </div>

        <p
          className={`text-sm leading-relaxed ${isDone ? "text-gray-400" : "text-gray-600"} line-clamp-3 min-h-12`}
        >
          {task.description || "No description provided."}
        </p>

        {currentUser?.role === "admin" && task.createdBy && (
          <div className="flex items-center gap-x-1.5 text-xs text-gray-400 mt-2 bg-gray-50 px-2.5 py-1.5 rounded-lg w-fit">
            <span>Created by:</span>
            <span className="font-semibold text-gray-600">{creatorName}</span>
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100 flex items-end justify-between">
        <div className="flex flex-col gap-y-1">
          <span className="text-[11px] text-gray-400 font-medium">
            Created:{" "}
            {new Date(task.createdAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          {task.dueDate && (
            <span className="text-[11px] text-rose-600 font-semibold flex items-center gap-x-1">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Due:{" "}
              {new Date(task.dueDate).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          )}
        </div>
        {canModify && (
          <div className="flex gap-x-3">
            {!isDone && onComplete && (
              <TextButton
                onClick={() => onComplete(task)}
                title="Done"
                color="success"
                className="font-semibold"
              />
            )}
            <TextButton
              onClick={() => onEdit(task)}
              title="Edit"
              color="primary"
              className="font-semibold"
            />
            <TextButton
              onClick={() => onDelete(task)}
              title="Delete"
              color="danger"
              className="font-semibold"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskCard
