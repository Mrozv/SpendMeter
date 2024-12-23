import express from "express"

const app = express()
const port = 3000

app.get('/', (req, res)=>{
    res.send('<h1>Hello backend</h1>')
})

app.listen(port, ()=>{
    console.log("listening on port 3000")
})
das