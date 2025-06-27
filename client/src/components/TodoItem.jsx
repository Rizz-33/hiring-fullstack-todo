import { Check, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";

const TodoItem = ({ todo, onToggle, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description || "",
  });

  const handleEditSave = () => {
    if (!editData.title.trim()) return;
    onEdit(todo._id, editData);
    setIsEditing(false);
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-sm transition-all ${
        todo.done
          ? "border-l-4 border-green-500 opacity-90"
          : "border-l-4 border-indigo-500"
      }`}
    >
      {isEditing ? (
        <div className="p-6 space-y-4">
          <input
            type="text"
            value={editData.title}
            onChange={(e) =>
              setEditData({ ...editData, title: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg font-medium"
            placeholder="Task title"
          />
          <textarea
            value={editData.description}
            onChange={(e) =>
              setEditData({ ...editData, description: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-24 resize-none"
            placeholder="Description (optional)"
          />
          <div className="flex gap-3">
            <button
              onClick={handleEditSave}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Check className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3
                className={`text-xl font-semibold mb-2 ${
                  todo.done ? "line-through text-gray-500" : "text-gray-800"
                }`}
              >
                {todo.title}
              </h3>
              {todo.description && (
                <p
                  className={`text-gray-600 mb-4 ${
                    todo.done ? "line-through" : ""
                  }`}
                >
                  {todo.description}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>
                  Added: {new Date(todo.createdAt).toLocaleDateString()}
                </span>
                <span>
                  Updated: {new Date(todo.updatedAt).toLocaleDateString()}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    todo.done
                      ? "bg-green-100 text-green-800"
                      : "bg-indigo-100 text-indigo-800"
                  }`}
                >
                  {todo.done ? "Done" : "In progress"}
                </span>
              </div>
            </div>
          </div>

          {/* actions */}
          <div className="flex gap-3 mt-5">
            <button
              onClick={() => onToggle(todo._id)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                todo.done
                  ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              <Check className="w-4 h-4" />
              {todo.done ? "Mark not done" : "Mark done"}
            </button>
            {!todo.done && (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
            )}
            <button
              onClick={() => onDelete(todo._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
