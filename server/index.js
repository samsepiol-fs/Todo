const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());

//Define todo schema
const todoSchema = new mongoose.Schema({
    title : String
});

//Define mongoose models
const Todo = mongoose.model('Todo',todoSchema);

//Connect to MongoDB
mongoose.connect('mongodb+srv://prabhavdixit007:iehYprYX4YOlMlow@cluster0.tn2resf.mongodb.net/todoappdb2', {useNewUrlParser : true, useUnifiedTopology : true, dbName : "todoAppdb2"});

//Routes
app.post('/todos', (req,res)=>{
    const {title} = req.body;
    const obj = {title};
    const newTodo = new Todo(obj);
    newTodo.save();
    res.json({message : 'Todo created successfully'});
});

app.get('/todos', async (req,res)=>{
    const todos = await Todo.find({});
    res.json({todos});
})

app.delete('/todos/:todoId', async (req,res)=>{
    const deleteTodo = await Todo.findByIdAndDelete(req.params.todoId);
    if(deleteTodo) res.json({message : "Todo deleted successfully"});
    else res.sendStatus(404).json({message : 'Todo not found'});
} )

app.listen(port,()=> console.log('Server running on port 3000'));
