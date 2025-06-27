const TodoStats = ({ todos }) => {
  const total = todos.length;
  const done = todos.filter((todo) => todo.done).length;
  const inProgress = total - done;

  return (
    <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-5 text-gray-800">
        Your Progress
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-indigo-50 p-4 rounded-lg text-center">
          <div className="text-3xl font-bold text-indigo-600">{total}</div>
          <div className="text-gray-600">Total Tasks</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-3xl font-bold text-green-600">{done}</div>
          <div className="text-gray-600">Done</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg text-center">
          <div className="text-3xl font-bold text-yellow-600">{inProgress}</div>
          <div className="text-gray-600">In Progress</div>
        </div>
      </div>
    </div>
  );
};

export default TodoStats;
