const express = require('express');
const router = express.Router();
const Tarea = require('../models/tarea.model');

router.get('/', async (req, res) => {
  const tareas = await Tarea.find();
  console.log(tareas);
  res.json(tareas);
})

router.get('/:id', async (req, res) => {
  const tarea = await Tarea.findById(req.params.id);
  res.json(tarea);
})

router.post('/add', async (req, res) => {
  const { title, description } = req.body;
  const tarea = new Tarea({title, description});
  await tarea.save();
  res.json({status: 'Tarea grabada'});
})

router.put('/:id', async (req, res) => {
  const { title, description } = req.body;
  const nuevaTarea = {title, description};
  await Tarea.findByIdAndUpdate(req.params.id, nuevaTarea);
  res.json({status: 'Task Updated'});
});

router.delete('/:id', async (req, res) => {
  await Tarea.findByIdAndRemove(req.params.id);
  res.json({status: 'Tarea eliminada'});
})

module.exports = router;
