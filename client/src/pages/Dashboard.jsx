// useState to get info from express. useEffect to render all info
import { useState, useEffect } from 'react'
// dashboard displalys and retrieves all our info. need to make AXIOS call to server
import axios from "axios"
// {link} allows us to navigate through different pages
import {Link} from 'react-router-dom'

const Dashboard = () => {
// STATE
    // [] empty array as argument ecause it'll return a list of objects
    const [allAuthors, setAllAuthors] = useState([])
    
// DELETE STATE to use on useEffect
// change state to refresh on deletion
const [refresh, setRefresh] = useState(false)


// useEffect takes in two arguments - arrow function and empty array
    useEffect(() => {
        axios.get("http://localhost:8000/api/authors")
            .then(res => setAllAuthors(res.data))
            .catch(errors => console.log(errors))
    }, [refresh])

// DELETE FUNCTIONALITY
    const deleteAuthor = (author_id) => {
        // console.log(author_id)
        axios.delete(`http://localhost:8000/api/authors/${author_id}`)
            // .then(res => console.log(res.data))
            .then(res => setRefresh(!refresh))
            .catch(errors => console.log(errors))
    }

    return (
        <fieldset>
            <h1>Favorite Authors:</h1>
            <h3>
                <Link to={"/"}>New Author</Link>
            </h3>
            <table>
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>Manga</th>
                        <th>Main Character</th>
                        <th>Checkbox</th>
                        <th>Number</th>
                        <th>Drop</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // MAP THROUGH ALL ITEMS with useEffect
                        allAuthors.map((author) => {
                            return(
                                <tr key={author._id}>
                                    <td>{author.author}</td>
                                    <td>{author.manga}</td>
                                    <td>{author.mc}</td>
                                    {/* TERNARY TO DISPLAY CHECKBOX ANSWSER - BOOLEANS DONT SHOW */}
                                    {(author.checkbox) ? <td>Yes</td> : <td>No</td> }
                                    <td>{author.checkbox}</td>
                                    <td>{author.number}</td>
                                    <td>{author.drop}</td>
                                    <td>
                                        <Link to={`/authors/edit/${author._id}`} >Edit</Link>|
                                        {/* delete must have callback arrow functionality */}
                                        <button onClick={() => deleteAuthor(author._id)}>Delete</button>
                                    </td>
                                    
                                </tr>
                            )

                        })
                    }
                </tbody>
            </table>
        </fieldset>
    )
}

export default Dashboard


// IMPORT AND WORK ON DELETE FUNCTIONS