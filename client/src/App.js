import React, { useState } from 'react';
import './App.css';
import CreateOnePet from './components/CreateOnePet';
import EditOnePet from './components/EditOnePet'
import OnePetDetails from './components/OnePetDetails'
import ShowAllPets from './components/ShowAllPets'

import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <div className="container">
          <h2 className="text-center text-dark bg-success mt-3">Welcome to the Pet Shelter!</h2>

        </div>
        <Route exact path="/">

          <ShowAllPets></ShowAllPets>
        </Route>
        <Route exact path="/pets/new">
          <h2 className="float-end m-3">
            <Link to="/" className="btn btn-primary mt-3 ">Home</Link>
          </h2>
          <CreateOnePet></CreateOnePet>
        </Route>
        <Route exact path="/show/pets/:petId">
          <h2 className="float-end">
            <Link to="/" className="btn btn-primary mt-3 ">Home</Link>
          </h2>
          <OnePetDetails></OnePetDetails>
        </Route>
        <Route exact path="/:petId/edit">
          <h2 className="float-end">
            <Link to="/" className="btn btn-primary mt-3 ">Home</Link>
          </h2>
          <EditOnePet></EditOnePet>
        </Route>
      </BrowserRouter>

    </div>
  );
}

export default App;

