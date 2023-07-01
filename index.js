const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Book = require('./models/books')

const app = express()
dotenv.config();
const PORT = process.env.PORT || 3000
const URL = process.env.MONGO_URI

mongoose.set('strictQuery', false);
const connectDB = async() =>{
    try {
        const conn = await mongoose.connect(URL)
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    }catch(error){
        console.log(error);
        process.exit(1)
    }
}

//Routes
app.get('/', (req,res) => {
    res.send({title:'Books'})
})

app.get('/books',async (req,res)=>{
    const book = await Book.find()
    if(book){
        res.json(book)
    }else{
        res.send("Something went wrong")
    }
});

app.get('/add-note', async (req,res)=>{
    try{
        await Book.insertMany([
            {
                title: "Sons Of Anarchy",
                body: "Body text goes here...",
              },
              {
                title: "Games of Thrones",
                body: "Body text goes here...",
              }  
        ])
    }catch (error) {
        console.log("err", + error);
    }
})
connectDB().then(()=>{
    app.listen(PORT,()=>console.log(`listening for port ${PORT} `))
})