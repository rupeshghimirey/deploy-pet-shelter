import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from "react-router-dom";


const ShowAllPets = () => {

    const [allPets, setAllPets] = useState([])

    const [deleteToggle, setDeleteToggle] = useState(false)

    useEffect(() => {
        axios.get("http://localhost:8000/api/pets")
            .then(res => {
                console.log("response when getting all pets-->", res)
                setAllPets(res.data.results)
            })
            .catch(err => console.log("Error while getting all pets!", err))

    }, [deleteToggle])

    const deletePet = (petId) => {
        console.log("Here is the ", petId)
        axios.delete(`http://localhost:8000/api/pets/delete/${petId}`)
            .then(res => {
                console.log("response after axios delete-->", res)
                setDeleteToggle(!deleteToggle)
            })
            .catch(err => console.log("errrrrr when deleting from homePage-->", err))
    }


    
    return (
        <div className="mt-4">
            <h2 className="">
                <Link to="/pets/new">Add Pet to the Shelter</Link>
            </h2>
            <h2 className="text-danger text-center"> These pets are looking for a good home!</h2>
            <table className="table">

                <thead className="thead-dark">
                    <tr>
                        <th scope="col"><h2>Name</h2></th>
                        <th scope="col"><h2>Type</h2></th>
                        <th scope="col" className="h2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allPets.map((pet, i) => {
                            return (
                                <tr className="text-success">
                                    <td><h3>{pet.name}</h3></td>
                                    <td><h3>{pet.type}</h3></td>
                                    <td><Link to={`/show/pets/${pet._id}`} className="btn btn-primary">details</Link> <Link to={`/${pet._id}/edit`} className="btn btn-success">edit</Link></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};


export default ShowAllPets;