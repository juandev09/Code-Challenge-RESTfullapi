import express from 'express';

const app = express();
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!');
});

let tasks = [];
let taskId = 1;

/**
 * @method GET
 * @url /tasks
 * @desc Retrive all tasks
 */
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

/**
 * @method POST
 * @url /tasks
 * @desc Create a new task
 */
app.post('/tasks', (req, res) => {
  const { title, completed } = req.body;

  if (typeof title !== 'string' || typeof completed !== 'boolean') {
    return res.status(400).json({ message: 'Invalid data' });
  }

  const newTask = {
    id: taskId++,
    title,
    completed
  };

  tasks.push(newTask);
  res.json(newTask);
});

/**
 * @method PUT
 * @url /tasks/:id
 * @params id - id of a task
 * @desc Update an existing task by id
 */
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const task = tasks.find(task => task.id === parseInt(id));
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  task.title = title;
  task.completed = completed;

  res.json(task);
});

/**
 * @method DELETE
 * @url /tasks/:id
 * @params id - id of a task m
 * @desc Delete a task by id
 */
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;

  const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks.splice(taskIndex, 1);

  res.status(204).send();
});


const port = parseInt(process.env.PORT || '3000');

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});