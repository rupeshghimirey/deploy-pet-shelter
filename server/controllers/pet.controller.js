const Pet = require("../models/pet.model")


module.exports.findAllPets = (req,res)=>{
    Pet.find()
        .then(allPets =>{
            res.json({results: allPets })
            console.log("logging allPets",allPets)
        })
        .catch(err => res.json({message: "Something went wrong when finding all Pets!", err: err}))
}

module.exports.createPet = (req,res)=>{
    Pet.create(req.body)
        .then(newlyCreatedPet =>{
            res.json({results: newlyCreatedPet })
            console.log(newlyCreatedPet);
        })
        .catch(err => res.json({message: "Something went wrong when creating a Pet!", err: err}))
}

module.exports.findOnePet = (req,res)=>{
    Pet.findOne({_id:req.params.id })
        .then(foundPet =>{
            res.json({results: foundPet })
        })
        .catch(err => res.json({message: "Something went wrong when finding one Pet!", err: err}))
}

module.exports.updateOnePet = (req,res)=>{
    Pet.findOneAndUpdate(
        {_id:req.params.id }, //locate which Pet we want to update
        req.body, //info from the form we using to update the Pet with
        {new:true, runValidators:true}
        )
    .then(updatedPet =>{
        res.json({results: updatedPet })
    })
    .catch(err => res.json({message: "Something went wrong when updating a Pet!", err: err}))
}


module.exports.deleteOnePet = (req,res)=>{
    Pet.deleteOne({_id:req.params.id })
        .then(deletedPet =>{
            res.json({results: deletedPet })
        })
        .catch(err => res.json({message: "Something went wrong when deleting a Pet!", err: err}))
}