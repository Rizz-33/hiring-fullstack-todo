import express from "express";
import Todo from "../models/todo.model.js";

const router = express.Router();

// getting all todo(s)
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// adding a new todo
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;

    // validating required fields
    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }

    const todo = new Todo({
      title: title.trim(),
      description: description ? description.trim() : "",
    });

    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// updating a todo
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // validating required fields
    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        description: description ? description.trim() : "",
      },
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(updatedTodo);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid todo ID" });
    }
    res.status(400).json({ message: error.message });
  }
});

// updating the status
router.patch("/:id/done", async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.done = !todo.done;
    const updatedTodo = await todo.save();

    res.json(updatedTodo);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid todo ID" });
    }
    res.status(500).json({ message: error.message });
  }
});

// deleting a todo
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully", todo: deletedTodo });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid todo ID" });
    }
    res.status(500).json({ message: error.message });
  }
});

export default router;
