import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router = express.Router()

//Register new user endpoint /auth/register
router.post('/register', (req, res) =>{ 
    const {username, password} = req.body

    //Encrypt the password
    const hashed_password = bcrypt.hashSync(password, 8)

    //Save new user and hashed password to db
    try {
        const insertUser = db.prepare(`INSERT INTO users(username, password)
        VALUES (?, ?)`)
        const result = insertUser.run(username, hashed_password)

        // now that we have a user, I want to add their first todo for them
        const defaultTodo = `Hello :) Add your first todo!`
        const insertTodo = db.prepare(`INSERT INTO todos (user_id, task)
        VALUES(?,?)`)
        insertTodo.run(result.lastInsertRowid, defaultTodo)

        //create a token 
        const token = jwt.sign({id: result.lastInsertRowid}, process.env.JWT_SECRET, {expiresIn: '24h'})
        res.status(201).json({token})

    } catch(err){
        console.log(err.message)
        res.sendStatus(503).json({error: 'Service unavailabe.Try again later'})
    }

    
})

router.post('/login', (req, res) => {
    const {username, password} = req.body

    try {
        const getUser = db.prepare('SELECT * FROM users WHERE username = ?')
        const user = getUser.get(username)

        if (!user) {return res.status(404).send({message: "User not found"})}

        const passwordIsValid = bcrypt.compareSync(password, user.password)
        //if password does not match, return out of the function
        if (!passwordIsValid)
            {return res.status(401).send({message: "Invalid password"})}
        console.log(user)
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'})
        res.json({token})

        //then we have successful authentication

    }catch(err) {
        console.log(err.message)
        res.sendStatus(503)
    }
})

export default router