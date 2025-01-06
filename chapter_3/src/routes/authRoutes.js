import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router = express.Router()

//Register new user endpoint /auth/register
router.post('/register', (req, res) =>{ 

})

router.post('/login', (req, res) => {

})

export default router