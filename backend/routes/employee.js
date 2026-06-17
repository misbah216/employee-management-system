const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Employee = require('../models/Employee');

const fallbackEmployees = [];

const useFallback = () => mongoose.connection.readyState !== 1;

const toSafeEmployee = (emp) => ({
  _id: emp._id || String(Date.now()),
  ...emp,
  salary: Number(emp.salary) || 0,
});

// GET all
router.get('/', async (req, res) => {
  try {
    if (useFallback()) {
      return res.json(fallbackEmployees);
    }

    const employees = await Employee.find();
    return res.json(employees);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch employees', error: err.message });
  }
});

// POST create
router.post('/', async (req, res) => {
  try {
    if (useFallback()) {
      const saved = toSafeEmployee({
        ...req.body,
        _id: String(Date.now()),
      });
      fallbackEmployees.push(saved);
      return res.status(201).json(saved);
    }

    const emp = new Employee(req.body);
    const saved = await emp.save();
    return res.status(201).json(saved);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to create employee', error: err.message });
  }
});

// PUT update
router.put('/:id', async (req, res) => {
  try {
    if (useFallback()) {
      const index = fallbackEmployees.findIndex((emp) => emp._id === req.params.id);
      if (index === -1) {
        return res.status(404).json({ message: 'Employee not found' });
      }

      fallbackEmployees[index] = toSafeEmployee({
        ...fallbackEmployees[index],
        ...req.body,
      });
      return res.json(fallbackEmployees[index]);
    }

    const updated = await Employee.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    );
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to update employee', error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    if (useFallback()) {
      const index = fallbackEmployees.findIndex((emp) => emp._id === req.params.id);
      if (index === -1) {
        return res.status(404).json({ message: 'Employee not found' });
      }

      fallbackEmployees.splice(index, 1);
      return res.json({ message: 'Employee deleted' });
    }

    await Employee.findByIdAndDelete(req.params.id);
    return res.json({ message: 'Employee deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to delete employee', error: err.message });
  }
});

module.exports = router;