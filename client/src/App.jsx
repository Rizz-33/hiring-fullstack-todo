import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import TodoStats from "./components/TodoStats";

const API_BASE_URL = "http://localhost:5000/api/todos";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  // fetching all todos
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error("Failed to fetch todos");
      const data = await response.json();
      setTodos(data);
      setError("");
    } catch (err) {
      setError("Failed to load todos. Make sure your server is running.");
      console.error("Error fetching todos:", err);
    } finally {
      setLoading(false);
    }
  };

  // adding a new todo
  const createTodo = async (todoData) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoData),
      });

      if (!response.ok) throw new Error("Failed to create todo");

      const createdTodo = await response.json();
      setTodos([createdTodo, ...todos]);
      setShowForm(false);
      setError("");
    } catch (err) {
      setError("Failed to create todo");
      console.error("Error creating todo:", err);
    }
  };

  // updating a todo
  const updateTodo = async (id, updatedData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error("Failed to update todo");

      const updatedTodo = await response.json();
      setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
      setError("");
    } catch (err) {
      setError("Failed to update todo");
      console.error("Error updating todo:", err);
    }
  };

  // updating the status
  const toggleTodoStatus = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}/done`, {
        method: "PATCH",
      });

      if (!response.ok) throw new Error("Failed to toggle todo status");

      const updatedTodo = await response.json();
      setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
      setError("");
    } catch (err) {
      setError("Failed to update todo status");
      console.error("Error toggling todo status:", err);
    }
  };

  // deleting todo
  const deleteTodo = async (id) => {
    if (!window.confirm("Are you sure you want to delete this todo?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete todo");

      setTodos(todos.filter((todo) => todo._id !== id));
      setError("");
    } catch (err) {
      setError("Failed to delete todo");
      console.error("Error deleting todo:", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  // sorting todos
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.done === b.done) return 0;
    return a.done ? 1 : -1;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 font-serif">
            Todo App
          </h1>
          <p className="text-gray-600 text-sm">
            Organize your work efficiently and stay focused on your goals
          </p>
        </div>

        {/* error messages */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        {/* button to add todos */}
        <div className="mb-8 flex justify-center">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Add New Task</span>
          </button>
        </div>

        {/* form to add todos */}
        {showForm && (
          <TodoForm onSubmit={createTodo} onCancel={() => setShowForm(false)} />
        )}

        {/* existing todo list */}
        <div className="space-y-4">
          {sortedTodos.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <p className="text-gray-500 text-lg">
                Your task list is empty. Add your first task!
              </p>
            </div>
          ) : (
            sortedTodos.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onToggle={toggleTodoStatus}
                onEdit={updateTodo}
                onDelete={deleteTodo}
              />
            ))
          )}
        </div>

        {/* stats */}
        {sortedTodos.length > 0 && <TodoStats todos={sortedTodos} />}
      </div>
    </div>
  );
};

export default App;
