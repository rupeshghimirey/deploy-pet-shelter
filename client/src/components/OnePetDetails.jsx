import React, {useState, useEffect} from 'react';
import { useParams } from "react-router";
import axios from 'axios'
import { useHistory } from "react-router-dom";

const OnePetDetails = () => {
    const { petId } = useParams(); //get the id of the pet from the route and put it in a variable
    const history = useHistory(); //so we can redirect after clicking on delete

    const [petInfo, setPetInfo] = useState({}) //a state variable to store information about the pet that we get back from the api
    const [count, setCount] = useState(0)

    //as soon as the pet Detail component renders, make an api call to get one pet by id, and store that pet info in a state variable without infinitely re-rendering this component
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/pets/${petId}`)
            .then(response=>{
                console.log("response when getting ONE pet-->", response)
                setPetInfo(response.data.results)
            })
            .catch(err=> console.log(err))

    },[])


    const deletePet = ()=>{
        console.log("deleting pet that has this id-->", petId)
        axios.delete(`http://localhost:8000/api/pets/delete/${petId}`) //make an axios call to our backend route to delete pet by id. we have this id available from the route parameter
            .then(response=>{
                console.log("response after deleting->",response)
                history.push("/") //redirect to "/" after deleting the pet

            })
            .catch(err=>console.log(err))
    }
    const increaseCount = ()=>{
        console.log("increasing count")
        setCount(count + 1)
    }


    return (
        <div>
            <div className="d-flex justify-content-between col-lg-6 offset-lg-3 mt-5">
                <h2 className="mt-2">Details about: <span className="text-primary">{petInfo.name}</span></h2>
                <div className="text-center m-3"><button onClick= {deletePet} className="btn btn-danger">Adopt {petInfo.name}! </button></div>
            </div>
            <div className="border border-dark container mt-4 col-lg-6 offset-lg-3">
                <h4 className="text-dark m-2 p-2 ">Pet Type: <br /> <span className="text-primary p-2 m-2">{petInfo.type}</span></h4>
                <h4 className="text-dark m-2 p-2">Skills: <br /><span className="text-primary p-2 m-2">{petInfo.firstSkill}</span> <br /><span className="text-primary p-2 m-2">{petInfo.secondSkill}</span> <br /><span className="text-primary p-2 m-2">{petInfo.thirdSkill}</span></h4>


                <div className="d-flex justify-content-between col-lg-6 offset-lg-3 mt-5">
                <button onClick= {increaseCount} className="btn btn-success m-3">Like {petInfo.name}! </button>

                <p className="mt-4"> <span>{count} </span> like(s)</p>
                
                </div>
                
            </div>

            
        </div>
    );
};


export default OnePetDetails;
