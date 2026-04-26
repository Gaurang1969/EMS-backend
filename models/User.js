const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Name is required"],
    trim: true 
  },

  email: { 
    type: String, 
    unique: true, 
    required: [true, "Email is required"],
    lowercase: true,
    trim: true
  },

  password: { 
    type: String, 
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"]
  },

  role: { 
    type: String, 
    enum: ['admin', 'employee'], 
    default: 'employee' 
  }

}, { timestamps: true });

/* : Hash password before saving (DRY) */
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
});

/* : Compare password method (Reusable) */
userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

/* : Index for faster email lookup */
//userSchema.index({ email: 1 });

module.exports = mongoose.model('User', userSchema);