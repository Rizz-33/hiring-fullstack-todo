# Todo App Server

A robust and scalable Node.js backend API for the Todo application. This server provides a RESTful API with MongoDB integration for managing todo items with full CRUD operations.

## 🚀 Features

- **RESTful API**: Full CRUD operations for todo management
- **MongoDB Integration**: Persistent data storage with Mongoose ODM
- **Data Validation**: Server-side validation for all inputs
- **Error Handling**: Comprehensive error handling with meaningful messages
- **CORS Support**: Configured for cross-origin requests from the client
- **Connection Monitoring**: Real-time MongoDB connection status logging
- **Optimized Database**: Connection pooling and retry mechanisms
- **Node.js v22 Compatible**: Optimized for the latest Node.js version

## 🛠️ Tech Stack

- **Node.js v22.16.0** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-Origin Resource Sharing middleware
- **dotenv** - Environment variable management

## 📁 Project Structure

```
server/
├── configs/
│   └── db.js
├── models/
│   └── todo.model.js
├── routes/
│   └── todo.route.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

## 🚦 Prerequisites

Before running this server, make sure you have:

- **Node.js** (version 22.16.0 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (local installation or MongoDB Atlas account)

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Rizz-33/hiring-fullstack-todo.git
   cd server
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   MONGODB_URI=mongodb://localhost:27017/todoapp
   # For MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todoapp
   ```

4. **Start the server**

   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:5000`

## 🔌 API Endpoints

### Base URL: `http://localhost:5000/api/todos`

| Method   | Endpoint    | Description            | Request Body              |
| -------- | ----------- | ---------------------- | ------------------------- |
| `GET`    | `/`         | Get all todos          | -                         |
| `POST`   | `/`         | Create a new todo      | `{ title, description? }` |
| `PUT`    | `/:id`      | Update a todo          | `{ title, description? }` |
| `PATCH`  | `/:id/done` | Toggle todo completion | -                         |
| `DELETE` | `/:id`      | Delete a todo          | -                         |

### Request/Response Examples

#### GET /api/todos

```json
[
  {
    "_id": "64a1b2c3d4e5f6789",
    "title": "Complete project",
    "description": "Finish the todo app",
    "done": false,
    "createdAt": "2025-01-01T10:00:00.000Z",
    "updatedAt": "2025-01-01T10:00:00.000Z"
  }
]
```

#### POST /api/todos

**Request:**

```json
{
  "title": "New task",
  "description": "Task description"
}
```

**Response:**

```json
{
  "_id": "64a1b2c3d4e5f6789",
  "title": "New task",
  "description": "Task description",
  "done": false,
  "createdAt": "2025-01-01T10:00:00.000Z",
  "updatedAt": "2025-01-01T10:00:00.000Z"
}
```

#### PUT /api/todos/:id

**Request:**

```json
{
  "title": "Updated task",
  "description": "Updated description"
}
```

#### PATCH /api/todos/:id/done

Toggles the completion status of a todo.

#### DELETE /api/todos/:id

**Response:**

```json
{
  "message": "Todo deleted successfully",
  "todo": {
    /* deleted todo object */
  }
}
```

## 🗄️ Database Schema

### Todo Model

```javascript
{
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  done: {
    type: Boolean,
    default: false
  },
  createdAt: Date,
  updatedAt: Date
}
```

## ⚙️ Configuration

### Database Configuration (`configs/db.js`)

The database connection includes:

- **IPv4 First**: DNS resolution optimization for Node.js v22
- **Connection Pooling**: Min 1, Max 5 connections
- **Timeouts**: 5s server selection, 30s socket timeout
- **Retry Logic**: Automatic retry for reads and writes
- **Connection Monitoring**: Real-time status logging

### CORS Configuration

Configured to accept requests from:

- `http://localhost:5173` (Vite dev server)
- Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
- Headers: Content-Type

## 📦 Dependencies

### Production Dependencies

```json
{
  "cors": "^2.8.5",
  "dotenv": "^16.0.3",
  "express": "^4.18.2",
  "mongoose": "^8.0.0"
}
```

## 🔒 Validation & Error Handling

### Input Validation

- **Title**: Required field, cannot be empty or whitespace
- **Description**: Optional field, trimmed if provided
- **ID**: Validated as valid MongoDB ObjectId

### Error Responses

```json
// Validation Error
{
  "message": "Title is required"
}

// Not Found Error
{
  "message": "Todo not found"
}

// Invalid ID Error
{
  "message": "Invalid todo ID"
}
```

## 🌐 Environment Variables

Create a `.env` file with the following variables:

```env
MONGODB_URI=mongodb://<username>:<password>@ac-fedyyni-shard-00-00.ysqljuj.mongodb.net:27017,ac-fedyyni-shard-00-01.ysqljuj.mongodb.net:27017,ac-fedyyni-shard-00-02.ysqljuj.mongodb.net:27017/?ssl=true&replicaSet=atlas-otp13f-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0
```

## 🚀 Production Deployment

### Environment Setup

1. Set production MongoDB URI
2. Configure environment variables
3. Update CORS origins for production domain

### Recommended Production Settings

```javascript
// In production, update CORS configuration
app.use(
  cors({
    origin: ["http://localhost:5173", "https://yourdomain.com"],
    // ... other settings
  })
);
```

## 📊 Connection Monitoring

The server provides real-time MongoDB connection status:

- ✅ `connecting to MongoDB...`
- ✅ `MongoDB connected!`
- ✅ `MongoDB is connected [host]`
- ⚠️ `disconnecting from MongoDB...`
- ❌ `MongoDB disconnected!`
- 🔄 `MongoDB reconnected!`
- ❌ `MongoDB error: [error details]`

## 🧪 Testing the API

You can test the API using tools like:

- **Postman**
- **curl**
- **Thunder Client** (VS Code extension)
- **REST Client** (VS Code extension)

## 🆘 Support & Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**

   - Check MongoDB is running
   - Verify MONGODB_URI in .env file
   - Check network connectivity

2. **CORS Errors**

   - Verify client URL in CORS configuration
   - Check allowed methods and headers

3. **Port Already in Use**

   - Change port in server.js or set PORT environment variable
   - Kill existing processes using the port

4. **Validation Errors**
   - Ensure required fields are provided
   - Check data types match schema requirements

## 🔄 API Client Integration

This server is designed to work with the React client. Make sure the client's `API_BASE_URL` matches your server URL:

```javascript
// In client App.jsx
const API_BASE_URL = "http://localhost:5000/api/todos";
```
