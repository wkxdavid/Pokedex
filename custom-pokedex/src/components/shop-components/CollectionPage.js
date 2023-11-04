import React, { useState } from "react";
import { getDatabase, ref, set as firebaseSet } from 'firebase/database'
import { isSearchedPokemonCollection } from "../helper_functions";
import { useNavigate } from 'react-router-dom';


export function CollectionView(props) {
  const pokeCoins = props.pokeCoins
  const collectionPoke = props.data;
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const currentUser = props.currentUser;

  function handleChange(event) {
    event.preventDefault();
    setSearchQuery(event.target.value);
  }

  const pokemonData = collectionPoke.filter((pokemon) => {
    if ((isSearchedPokemonCollection(searchQuery, pokemon.name) || searchQuery === '')) {
        return true;
    } else {
        return false;
    }
  })

  const displayCollection = pokemonData.map((currPoke) => {
    const builtChoice = <SinglePoke
      key={currPoke.name}
      pokemonPic={currPoke.img}
      pokemonName={currPoke.name}
      pokemonKey={currPoke.key}
      handleRemove={handleRemove}
      />
    return builtChoice;
  });

  function handleViewShop(event) {
    event.preventDefault();
    navigate("/shop");
  }

  function handleRemove(props) {
    const db = getDatabase();
    const pokeCollectionKey = props.currentTarget.getAttribute("data-key");
    const collectionRef = ref(db, "userlist/" + currentUser.userId + "/collection/" + pokeCollectionKey);
    firebaseSet(collectionRef, null)
  }

  return(
    <div>
      <section className="shop-search-bar">
        <form onSubmit={handleChange} className="pokedex-form">
            <label htmlFor="pokename">Search by Name</label>
            <input onChange={handleChange} aria-label="search-bar" className="search-bar" type="text" id="pokename" name="pokename" required />
        </form>
      </section>
      <div className="shop-background">
        <div className="shop-player-coins">
          <p>Your Total:</p>
          <div className="shop-player-amount">
            <p>{pokeCoins} Coins</p>
            <img src={"img/shop-coin.png"} alt="coin" className="shop-coin"/>
          </div>
        </div>
        <button onClick={handleViewShop} type="button" className="shop-button">Back to Shop</button>
        <div className="shop-item-grid">
          {displayCollection}
        </div>
      </div>
    </div>
  )
}


function SinglePoke(props) {
  const pokeImg = props.pokemonPic;
  const pokeName = props.pokemonName;
  const pokemonKey = props.pokemonKey
  const handleRemove = props.handleRemove;

  return(
    <div className="shop-article">
      <img src={pokeImg} alt={pokeName} className="shop-choice"/>
      <p>{pokeName}</p>
      <button className="shop-button" data-value={pokeName} data-picture={pokeImg} data-key={pokemonKey} onClick={handleRemove}>Release Pokemon</button>
    </div>
  )
}
