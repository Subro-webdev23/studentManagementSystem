const express = require('express')
const cors = require('cors');
const connectDB = require('./Config/config');
const studentRouter = require('./routes/student');
const app = express()
const port = 3000

app.use(cors());
app.use(express.json());
connectDB('mongodb://localhost:27017/studentsManagementSystem');

app.get('/', (req, res) => {
  res.send('Student Management System is running on port ' + port);
})

app.use('/api/students', studentRouter);

app.listen(port, () => {
  console.log(`your app is running on http://localhost:3000`)
})