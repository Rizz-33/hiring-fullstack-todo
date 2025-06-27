# Todo App Client

A modern, responsive React-based todo application with a clean and intuitive user interface. This client application provides a seamless experience for managing your daily tasks and staying organized.

## 🚀 Features

- **Task Management**: Create, edit, delete, and mark tasks as complete
- **Real-time Updates**: Live synchronization with backend API
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Task Statistics**: Visual progress tracking with completion statistics
- **Clean UI**: Modern design with smooth animations and transitions
- **Form Validation**: Client-side validation for better user experience
- **Loading States**: Elegant loading indicators for better UX
- **Error Handling**: Comprehensive error handling with user-friendly messages

## 🛠️ Tech Stack

- **React 18** - Frontend framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Modern JavaScript (ES6+)** - Latest JavaScript features

## 📁 Project Structure

```
client/
├── public/
│   ├── vite.svg
│   └── react.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── LoadingSpinner.jsx
│   │   ├── TodoForm.jsx
│   │   ├── TodoItem.jsx
│   │   └── TodoStats.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

## 🚦 Prerequisites

Before running this application, make sure you have:

- **Node.js** (version 22.16.0 or higher)
- **npm** or **yarn** package manager
- **Backend API** running on `http://localhost:5000`

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Rizz-33/hiring-fullstack-todo.git
   cd client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 📱 Usage

### Adding a New Task

1. Click the "Add New Task" button
2. Fill in the task title (required)
3. Optionally add a description
4. Click "Add Task" to save

### Managing Tasks

- **Mark as Done**: Click the "Mark as Done" button
- **Edit Task**: Click the "Edit" button (only available for incomplete tasks)
- **Delete Task**: Click the "Delete" button (confirmation required)
- **Undo Completion**: Click "Undone" to mark a completed task as incomplete

### Viewing Progress

The stats section at the bottom shows:

- Total number of tasks
- Number of completed tasks
- Number of tasks in progress

## 🎨 Component Overview

### `App.jsx`

- Main application component
- Handles all API calls and state management
- Manages todo CRUD operations

### `TodoItem.jsx`

- Individual todo item component
- Handles edit mode and task actions
- Displays task details and timestamps

### `TodoForm.jsx`

- Form component for adding new tasks
- Handles form validation and submission
- Resets form state after submission

### `TodoStats.jsx`

- Statistics component showing task progress
- Displays total, completed, and in-progress counts
- Responsive grid layout

### `LoadingSpinner.jsx`

- Loading indicator component
- Elegant spinning animation
- Displays while data is being fetched

## 🔌 API Integration

The client expects a REST API with the following endpoints:

- `GET /api/todos` - Fetch all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `PATCH /api/todos/:id/done` - Toggle todo completion status
- `DELETE /api/todos/:id` - Delete a todo

### Expected Data Format

```json
{
  "_id": "unique-id",
  "title": "Task title",
  "description": "Task description",
  "done": false,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Environment Configuration

To change the API base URL, modify the `API_BASE_URL` constant in `App.jsx`:

```javascript
const API_BASE_URL = "http://localhost:5000/api/todos";
```

## 📦 Dependencies

### Production Dependencies

- `react` - Core React library
- `react-dom` - React DOM rendering
- `lucide-react` - Icon library

### Development Dependencies

- `@vitejs/plugin-react` - Vite React plugin
- `vite` - Build tool
- `eslint` - Code linting
- `tailwindcss` - CSS framework
- `autoprefixer` - CSS post-processor
- `postcss` - CSS transformation tool

## 🎨 Styling

This project uses **Tailwind CSS** for styling with:

- Responsive design utilities
- Custom color scheme (indigo, green, red, yellow)
- Smooth transitions and hover effects
- Gradient backgrounds
- Shadow effects for depth

## 🆘 Support

If you encounter any issues or have questions:

1. Check the console for error messages
2. Ensure your backend API is running
3. Verify all dependencies are installed
4. Check network connectivity
5. Check the node version
