import express from 'express'
import db from '../db.js'


const router = express.Router()

//Get all todos from logged-in user
router.get('/', (req, res) =>{
    const getTodos = db.prepare('SELECT * FROM todos WHERE user_id = ?')
    const todos = getTodos.all(req.userId)
    res.json(todos)
})

//Create new to-do
router.post('/', (req, res) => {
    const {task} = req.body
    const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?,?)`)
    insertTodo.run(req.userId, task)
    res.json({id: insertTodo.lastID, task, completed:0})
})

//Update to-do
router.put('/:id', (req, res) =>{})

//Delete to-do
router.delete('/i:id', (req, res) =>{})

export default router