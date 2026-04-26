const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Task title is mandatory"],
    trim: true,
    maxlength: [100, "Title cannot exceed 100 characters"]
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true
  },
  status: { 
    type: String, 
    enum: {
      values: ['pending', 'in-progress', 'completed'],
      message: '{VALUE} is not a valid status'
    },
    default: 'pending' 
  },
  priority: { 
    type: String, 
    enum: ['low', 'medium', 'high'], 
    default: 'medium' 
  },
  // RELATIONSHIPS
  assignedTo: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: [true, "A task must be assigned to an employee"] 
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: [true, "The creator (Admin) must be recorded"] 
  },
  dueDate: {
    type: Date,
    // Industry Logic: You can't set a deadline in the past
    validate: {
      validator: function(v) {
        return v >= new Date();
      },
      message: "Due date cannot be in the past!"
    }
  }
}, { 
  timestamps: true // Automatically generates createdAt and updatedAt
});

// Indexing for performance: Industry standard for faster searching
taskSchema.index({ assignedTo: 1, status: 1 });

module.exports = mongoose.model('Task', taskSchema);            