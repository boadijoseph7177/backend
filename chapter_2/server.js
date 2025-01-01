const express = require('express')
const app = express()
const PORT = 8383

//Data
let data = {
    name : 'Joseph'
}
//API Endpoints
app.get('/api/data', (req,res) => {
    console.log("This one is for data.")
    res.send(data)
})



//Website end points
app.get('/', (req,res) => {
    console.log("Yay, I hit an endpoint", req.method)
    res.send(`
        <body style ="background:pink;
        color: blue;">
        <h1>DATA:<h1>
        <p>${JSON.stringify(data)}</p>
        </body>
        `)
})

app.get('/dashboard', (req,res) => {
    console.log('Wow I hit the /dashboard endpoint')
    res.send('<h1>This is the dashboard.</h1>')
})



app.listen(PORT, () => console.log(`Server has started on: ${PORT}`))
