import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../prismaClient.js'

const router = express.Router()

//Register new user endpoint /auth/register
router.post('/register', async(req, res) =>{ 
    const {username, password} = req.body

    //Encrypt the password
    const hashed_password = bcrypt.hashSync(password, 8)

    //Save new user and hashed password to db
    try {
        const user = await prisma.user.create({
            data: {
                username,
                password: hashed_password
            }
        })

        // now that we have a user, I want to add their first todo for them
        const defaultTodo = `Hello :) Add your first todo!`
        await prisma.todo.create({
            data: {
                task: defaultTodo,
                userId: user.id
            }
        })

        //create a token 
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'})
        res.status(201).json({token})

    } catch(err){
        console.log(err.message)
        res.status(503).json({ error: 'Service unavailable. Try again later' });
    }

    
})

router.post('/login', async(req, res) => {
    const {username, password} = req.body


    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })

        if (!user) {return res.status(404).send({message: "User not found"})}

        const passwordIsValid = bcrypt.compareSync(password, user.password)
        //if password does not match, return out of the function
        if (!passwordIsValid)
            {return res.status(401).send({message: "Invalid password"})}
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'})
        res.json({token})

        //then we have successful authentication

    }catch(err) {
        console.log(err.message)
        res.sendStatus(503)
    }
})

export default router