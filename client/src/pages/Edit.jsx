import React, {useEffect, useState} from 'react'
import axios from "axios"
import { useParams, useNavigate } from 'react-router-dom'

const Edit = () => {

    // GET PATH VARIABLE - useParams grabs ID
    const {author_id} = useParams()
    const navigate = useNavigate()


    // DEFINE STATE
    // STATE NAMES MUST MATCH NAME IN SCHEMA
    const [author, setAuthor] = useState("")
    const [manga, setManga] = useState("")
    const [mc, setMc] = useState("")
    // ERROR STATE
    const [errors, setErrors] = useState([]);


    // useEffect
    useEffect(() => {
        axios.get(`http://localhost:8000/api/authors/${ author_id}`)
        .then( res=> {
            console.log(res.data)
            // pull these keys out of the object and remember them in state
            // setState prepopulates our form
            setAuthor(res.data.author)
            setManga(res.data.manga)
            setMc(res.data.mc)
        })
        .catch(errors => console.log(errors))
    }, [])

    // UPDATE PRODUCT function
    const updateAuthor = (e) => {
        e.preventDefault()
        // CREATE UPDATED BODY - send back to express api
        let updatedBody ={
        author,
        manga,
        mc
    }
    // MAKE AXIOS REQUEST
    axios.put(`http://localhost:8000/api/authors/${ author_id}`, updatedBody)
        .then( res => {
            console.log(res.data)
            // NAVIGATE TO
            navigate("/authors") 
        })
        .catch(err=>{
            const errorResponse = err.response.data.errors; // Get the errors from err.response.data
            const errorArr = []; // Define a temp error array to push the messages in
            for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                errorArr.push(errorResponse[key].message)
            }
            // Set Errors
            setErrors(errorArr);
        }) 
    // closes use effect hook
    }





    return (
        <fieldset>
            <h1>Edit Author:</h1>
            <form onSubmit={updateAuthor} >
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
                <button>Submit</button>
            </form>
                    {/* map through every error and display each error */}
        {/*  do not need to conditionally render over an empty array  */}
        {
            errors.map((error) => <p>{error}</p> )
        }
        </fieldset>
    )
}

export default Edit