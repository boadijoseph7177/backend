import express from 'express'
import db from '../db.js'


const router = express.Router()

//Get all todos from logged-in user
router.get('/', (req, res) =>{})

//Create new to-do
router.post('/', (req, res) => {})

//Update to-do
router.put('/:id', (req, res) =>{})

//Delete to-do
router.delete('/i:id', (req, res) =>{})

export default router