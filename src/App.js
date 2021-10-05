import React, { useState } from "react";
import "./App.css";
import PokemonView from "./pokemon";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";

const AppFunc = (props) => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/pokemonApp">
        <PokemonView />
      </Route>
    </Switch>
  );
};

export default AppFunc;