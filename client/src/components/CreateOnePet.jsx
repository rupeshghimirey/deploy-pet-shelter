import React, { useState } from 'react';
import axios from 'axios'
// import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";


const CreateOnePet = () => {
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
        axios.post("http://localhost:8000/api/pets", formInfo)
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
            <h4 className="text-center mt-5">Know a Pet Needing a Home?</h4>
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
                <div className="text-center"><input type="submit" value="Add Pet" className="btn btn-primary mt-3" /></div>

            </form>
        </div>
    );
};

export default CreateOnePet;