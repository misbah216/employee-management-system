const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Employee = require('../models/Employee');
const verifyToken = require('../middleware/auth');

const fallbackEmployees = [];

const useFallback = () => mongoose.connection.readyState !== 1;

const toSafeEmployee = (emp) => ({
  _id: emp._id || String(Date.now()),
  ...emp,
  salary: Number(emp.salary) || 0,
});

// Apply auth middleware to ALL routes below
router.use(verifyToken);

// GET all - only employees created by logged-in user
router.get('/', async (req, res) => {
  try {
    if (useFallback()) {
      const myEmployees = fallbackEmployees.filter((emp) => emp.createdBy === req.userId);
      return res.json(myEmployees);
    }

    const employees = await Employee.find({ createdBy: req.userId });
    return res.json(employees);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch employees', error: err.message });
  }
});

// POST create - automatically tag with createdBy
router.post('/', async (req, res) => {
  try {
    if (useFallback()) {
      const saved = toSafeEmployee({
        ...req.body,
        _id: String(Date.now()),
        createdBy: req.userId,
      });
      fallbackEmployees.push(saved);
      return res.status(201).json(saved);
    }

    const emp = new Employee({ ...req.body, createdBy: req.userId });
    const saved = await emp.save();
    return res.status(201).json(saved);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to create employee', error: err.message });
  }
});

// PUT update - only if owned by logged-in user
router.put('/:id', async (req, res) => {
  try {
    if (useFallback()) {
      const index = fallbackEmployees.findIndex(
        (emp) => emp._id === req.params.id && emp.createdBy === req.userId
      );
      if (index === -1) {
        return res.status(404).json({ message: 'Employee not found' });
      }

      fallbackEmployees[index] = toSafeEmployee({
        ...fallbackEmployees[index],
        ...req.body,
      });
      return res.json(fallbackEmployees[index]);
    }

    const updated = await Employee.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.userId },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Employee not found or not authorized' });
    }

    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to update employee', error: err.message });
  }
});

// DELETE - only if owned by logged-in user
router.delete('/:id', async (req, res) => {
  try {
    if (useFallback()) {
      const index = fallbackEmployees.findIndex(
        (emp) => emp._id === req.params.id && emp.createdBy === req.userId
      );
      if (index === -1) {
        return res.status(404).json({ message: 'Employee not found' });
      }

      fallbackEmployees.splice(index, 1);
      return res.json({ message: 'Employee deleted' });
    }

    const deleted = await Employee.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.userId,
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Employee not found or not authorized' });
    }

    return res.json({ message: 'Employee deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to delete employee', error: err.message });
  }
});

module.exports = router;