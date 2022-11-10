const mongoose = require("mongoose")

// DEFINE SCHEMA
// SCHEMA names must match the STATE in our front end(create.jsx)
const AuthorSchema = new mongoose.Schema({
    author:{
        type:String,
        required:[true, "Author: Name a real Author"],
        minLength:[3, "Name must be at least 3 letters. Ed, youre out"]
    },
    manga:{
        type:String,
        required:[true, "Manga: This manga is not it, dude"],
        minLength:[3, "Name must be at least 3 letters."]

    },
    mc:{
        type:String,
        required:[true, "Main Character: Come one, you can do better"],
        minLength:[3, "Name must be at least 3 letters."]

    }

    // TIMESTAMP HANDLES THE CREATED & UPDATED AT
} , {timestamps:true});

// REGISTER SCHEMA
const Author = mongoose.model('Author' , AuthorSchema)

// EXPORT MODEL
module.exports = Author;