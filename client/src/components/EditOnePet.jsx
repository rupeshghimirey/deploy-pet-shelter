import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { useParams } from "react-router";
// import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";


const EditOnePet = () => {
    const { petId } = useParams();
    const history = useHistory() //using history to that we can redirect to "/" when the form submits
    const [formInfo, setFormInfo] = useState({
        name: "",
        type: "",
        description: "",
        firstSkill: "",
        secondSkill: "",
        thirdSkill: ""
    })
    // include the variable which has the validation in the model file
    const [formErrors, setFormErrors] = useState({
        name: "",
        type: "",
        description: "",
    })
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/pets/${petId}`)
            .then(res=>{
                console.log("response when trying to get one pets-->", res)
                setFormInfo(res.data.results)
                setFormErrors(res.data.err.errors)
            })
            .catch(err=>console.log("errrrr when getting the pets ", err))
    },[])

    //changehandler to update the formInfo object with the information from the form as the form is being changed
    const changeHandler = (e) => {
        console.log("changinn the form!")
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value
        })
    }

    //submithandler for when the form submits we send this date to backend to create something new
    const submitHandler = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:8000/api/pets/${petId}`, formInfo)
            .then(response => {
                console.log("response after ", response)

                if (response.data.err) { //if the form is not filled out properly and there are validation errors, collect the validations errors and put them in a state variable using setFormErrors
                    setFormErrors(response.data.err.errors)
                } else {
                    //this is to clear out the form upon form submission
                    setFormInfo({
                        name: "",
                        type: "",
                        description: "",
                        firstSkill: "",
                        secondSkill: "",
                        thirdSkill: ""
                    })
                    //if theres any existing previous error messages, clear them out too
                    setFormErrors({
                        name: "",
                        type: "",
                        description: "",
                    })

                    //redirect to "/" after creating a player
                    history.push("/")

                }

            })
            .catch(err => console.log("error submitting the post request-->", err))

    }
    return (
        <div>
            <h2 className="mt-2 text-center mt-3">Edit : <span className="text-primary">{formInfo.name}</span></h2>
            <form onSubmit={submitHandler}>
                <div className="form-group col-lg-6 offset-lg-3">
                    <label htmlFor="">Pet Name:</label>
                    <input onChange={changeHandler} type="text" name="name" id="" className="form-control" value={formInfo.name} />
                    <p className="text-danger">{formErrors.name?.message}</p>
                </div>
                <div className="form-group col-lg-6 offset-lg-3">
                    <label htmlFor="">Pet Type:</label>
                    <input onChange={changeHandler} type="text" name="type" id="" className="form-control" value={formInfo.type} />
                    <p className="text-danger">{formErrors.type?.message}</p>
                </div>
                <div className="form-group col-lg-6 offset-lg-3">
                    <label htmlFor="">Pet Description:</label>
                    <input onChange={changeHandler} type="text" name="description" id="" className="form-control" value={formInfo.description} />
                    <p className="text-danger">{formErrors.description?.message}</p>
                </div>
                <div className="form-group col-lg-6 offset-lg-3">
                    <label htmlFor="">Skill 1:</label>
                    <input onChange={changeHandler} type="text" name="firstSkill" id="" className="form-control" value={formInfo.firstSkill} />
                </div>
                <div className="form-group col-lg-6 offset-lg-3">
                    <label htmlFor="">Skill 2:</label>
                    <input onChange={changeHandler} type="text" name="secondSkill" id="" className="form-control" value={formInfo.secondSkill} />
                    
                </div>
                <div className="form-group col-lg-6 offset-lg-3">
                    <label htmlFor="">Skill 3:</label>
                    <input onChange={changeHandler} type="text" name="thirdSkill" id="" className="form-control" value={formInfo.thirdSkill} />
                </div>
                <div className="text-center"><input type="submit" value="Edit Pet" className="btn btn-primary mt-3" /></div>

            </form>
        </div>
    );
};

export default EditOnePet;