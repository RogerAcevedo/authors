const AuthorController = require("../controllers/author.controller")
const Author = require("../models/author.model")

module.exports = app => {
// CREATE
app.post("/api/authors", AuthorController.createAuthor)


// REALL ALL
app.get("/api/authors" , AuthorController.allAuthors)

// READ ONE
// must specify the ID of object being called
app.get("/api/authors/:author_id", AuthorController.oneAuthor)


// UPDATE
// "app.put" WHEN UPDATING
app.put("/api/authors/:author_id", AuthorController.updateAuthor)


// DELETE
app.delete("/api/authors/:author_id" , AuthorController.deleteAuthor)

}


// POST TO CREATE
// GET FOR READ ALL AND ONE
// PUT & PATCH WHEN UPDATING
// DELETE when deleting
