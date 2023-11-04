import React from "react";

import { GuessingGame } from "./game-components/GuessingGame";

export function BuiltGame(props) {
  const currentUser = props.currentUser;
  const pokeCoins = props.pokeCoins;

  return(
    <div>
      <GuessingGame pokemonInfo={props.pokemonData} currentUser={currentUser} pokeCoins={pokeCoins}/>
    </div>
  )
}
