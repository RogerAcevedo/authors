import React, {useState} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import {Link} from 'react-router-dom'

const Create = () => {

    // NAVIGATE FUNCTION
    const navigate = useNavigate()


    // DEFINE STATE
    // STATE SCHEMA NEEDS TO MATCH KEY NAMES IN OUR SCHEMA
    const [author, setAuthor] = useState("")
    const [manga, setManga] = useState("")
    const [mc, setMc] = useState("")
    // ERROR STATE
    const [errors, setErrors] = useState([]);


    // CREATE NEW AUTHOR FUNCTION
    const createAuthor = (e) => {
        // prevents from refreshing
        e.preventDefault()
        // CREATE A BODY OBJECT TO SEND INFO TO EXPRESS(api)
        let body = {
            "author": author,
            "manga" : manga,
            "mc" : mc
        }

    // AXIOS REQUEST - makes call to our express server(API)
    // responds with our body, which was created and stored in the model
    axios.post("http://localhost:8000/api/authors", body)
        .then(res => {
            // to clear out form when you succesfully create something
            console.log(res.data)
            setAuthor("")
            setManga("")
            setMc("")
            navigate("/authors")
        })
        // .catch(errors => console.log(errors.response.data.errors))
        .catch(err=>{
            const errorResponse = err.response.data.errors; // Get the errors from err.response.data
            const errorArr = []; // Define a temp error array to push the messages in
            for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                errorArr.push(errorResponse[key].message)
            }
            // Set Errors
            setErrors(errorArr);
        })    
    // const Create END curly bracket - must close off function
    }

    return (

        <fieldset>
        <h3>
        <Link to={"/authors"}>All Authors</Link>
        </h3>    
        <h1>New Author:</h1>
        <form onSubmit={createAuthor}>
            {/* value={} clears out after succesful creation */}
            {/* onChange= keeps track of state */}
            <h3>
                Author:
                <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
            </h3>
            <h3>
                Manga:
                <input type="text" value={manga} onChange={(e) => setManga(e.target.value)} />
            </h3>
            <h3>Main Character:
                <input type="text" value={mc} onChange={(e) => setMc(e.target.value)} />
            </h3>
            <button>Sumbit</button>
        </form>
        {/* map through every error and display each error */}
        {/*  do not need to conditionally render over an empty array  */}
        {
            errors.map((error) => <p>{error}</p> )
        }
        </fieldset>
    )
}

export default Create


// NEED TO IMPORT NAVIGATE AND WORK ON THAT