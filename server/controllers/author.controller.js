const Author = require("../models/author.model")



// CREATE
module.exports.createAuthor = (req, res) => {
    // req.body - displays ITS OUR FORM
    // .create is a mongoose command
    Author.create(req.body)
        .then(newAuthor => {
            res.json(newAuthor)
        })
        .catch(errors => res.status(400).json(errors))
}


// READ ALL
module.exports.allAuthors = (req, res) => {
    Author.find()
        .then(allAuthors => res.json(allAuthors))
        .catch(errors => res.json(errors))
}

// READ ONE
module.exports.oneAuthor = (req,res) => {
    Author.findOne({_id: req.params.author_id})
        .then(oneAuthor => res.json(oneAuthor))
        .catch(errors => res.json(errors))
}


// UPDATEs
module.exports.updateAuthor = (req,res) => {
    // SECOND ARGUMENT IS req.body BECAUSE THATS THE NEWLY UPDATED OBJECT
    // 3rd argument - "new:true" we get updated object back
    // runValidators:true - MUST HAVE IN ORDER TO RUN VALIDATIONS
    Author.findByIdAndUpdate({_id: req.params.author_id}, req.body, {new:true, runValidators:true})
        .then(updatedAuthor => res.json(updatedAuthor))
        .catch(errors => res.status(400).json(errors))
}



// DELETE
module.exports.deleteAuthor = (req,res) => {
    Author.deleteOne({_id:req.params.author_id})
    .then(confirmation => res.json(confirmation))
    .catch(errors => res.json(errors))
}