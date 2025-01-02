const express = require('express')
const app = express()
const PORT = 8383

//Data
let data = ["Joseph"]

app.use(express.json())

//API Endpoints
app.get('/api/data', (req,res) => {
    console.log("This one is for data.")
    res.send(data)
})

app.post('/api/data', (req, res) => {
    const newEntry = req.body
    console.log(newEntry)
    data.push(newEntry.name)
    res.sendStatus(201)
})

app.delete('/api/data', (req, res) =>{
    data.pop()
    console.log(data)
    res.sendStatus(203);
})


//Website end points
app.get('/', (req,res) => {
    console.log("User requested the homepage")
    res.send(`
        <body style ="background:pink;
        color: blue;">
        <h1>DATA:<h1>
        <p>${JSON.stringify(data)}</p>
        <a href="/dashboard">Dashboard</a>
        </body>
        <script>console.log('This is my script')</script>
        `)
})

app.get('/dashboard', (req,res) => {
    console.log('Wow I hit the /dashboard endpoint')
    res.send(`
    <body>
    <h1>This is the dashboard.</h1>
    <a href="/">home</a>
    </body>
    `)
})



app.listen(PORT, () => console.log(`Server has started on: ${PORT}`))
