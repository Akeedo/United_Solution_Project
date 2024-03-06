const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const Joi = require('joi');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');


require('./database');
const User = require('./models/User');

const app = express();
app.use(bodyParser.json());

app.use(cors());

// Joi schema definition
const userSchema = Joi.object({
    userName: Joi.string().min(3).max(20).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  });

// Validation middleware
const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    next();
  };

  

// CREATE
app.post('/users', [
    // Validation and sanitization rules
    body('userName').trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('password').trim().escape(),
  ], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    // Extract sanitized values
    const { userName, email, password } = req.body;
  
    try {
      // Check if userName or email already exists
      const userNameExists = await User.findOne({ userName });
      const emailExists = await User.findOne({ email });
  
      if (userNameExists) {
        return res.status(400).send({ message: "Username already taken." });
      }
      if (emailExists) {
        return res.status(400).send({ message: "Email already registered." });
      }
    // Hash password
    const saltRounds = 10; // Or another number you deem secure
    const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Proceed to create the new user with sanitized inputs
      const newUser = new User({ userName, email, password: hashedPassword });
      await newUser.save();
      res.status(201).send(newUser);
    } catch (error) {
      res.status(400).send(error);
    }
  });

// READ (all users)
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// READ (single user by ID)
app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findOne({ id: req.params.id });
        if (!user) {
        return res.status(404).send();
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// UPDATE
app.patch('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).send();
        }
        res.status(200).send(updatedUser);
    } catch (error) {
        res.status(400).send(error);
    }
});

// DELETE
app.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({ id: req.params.id });
        if (!deletedUser) {
        return res.status(404).send();
        }
        res.status(200).send(deletedUser);
    } catch (error) {
        res.status(500).send(error);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
