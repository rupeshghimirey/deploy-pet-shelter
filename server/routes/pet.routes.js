const PetController = require("../controllers/pet.controller")


module.exports = app =>{

    //find all pets
    app.get("/api/pets", PetController.findAllPets)

    //create new Pet
    app.post("/api/pets",PetController.createPet)

    //find one Pet
    app.get("/api/pets/:id", PetController.findOnePet)

    //update a Pet
    app.put("/api/pets/:id", PetController.updateOnePet)

    //delete a Pet
    app.delete("/api/pets/delete/:id",PetController.deleteOnePet)
}