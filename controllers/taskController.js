const Task = require('../models/Task');

/* Admin creates and assigns task */
exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, assignedTo } = req.body;

    // Only admin can create
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      assignedTo,
      createdBy: req.user.id
    });

    res.status(201).json(task);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*  Admin sees all tasks */
exports.getAllTasks = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const tasks = await Task.find()
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name');

    res.json(tasks);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*  Employee sees only their tasks */
exports.getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.id });
    res.json(tasks);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*  Employee updates ONLY their task */
exports.updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Only assigned employee can update
    if (task.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    task.status = req.body.status;
    await task.save();

    res.json(task);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};