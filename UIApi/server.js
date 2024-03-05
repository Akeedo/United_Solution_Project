const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('./database');
const User = require('./models/User');

const app = express();
app.use(bodyParser.json());

// CREATE
app.post('/users', async (req, res) => {
  const { id, name, email, password } = req.body;
  try {
    const newUser = new User({ id, name, email, password });
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
