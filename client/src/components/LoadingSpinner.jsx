const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-indigo-100 rounded-full"></div>
        </div>
        <p className="text-gray-600 text-lg font-medium">
          Loading your tasks...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
