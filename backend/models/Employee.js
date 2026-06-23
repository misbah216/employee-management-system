const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  email:      { type: String, required: true },
  department: { type: String, required: true },
  role:       { type: String, required: true },
  salary:     { type: Number, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  joiningDate:{ type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);