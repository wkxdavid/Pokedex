import React, { useState } from "react";
import { getDatabase, ref, set as firebaseSet, push as firebasePush } from 'firebase/database'
import { isSearchedPokemonCollection } from "../helper_functions";
import { useNavigate } from 'react-router-dom';



export function FullShopGrid(props){
  const pokeCoins = props.pokeCoins
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const pokeData = props.data;
  const currentUser = props.currentUser;

  const handleCollectionClick =  function(event) {
    event.preventDefault();
    navigate("/collection");
  }

  function handleChange(event) {
    event.preventDefault();
    setSearchQuery(event.target.value);
  }

  function handelPurchance(props) {
    if((pokeCoins - 5) > -1) {
      const db = getDatabase();
      const coinRef = ref(db, "userlist/" + currentUser.userId + "/coin");
      const newAmount = pokeCoins - 5;
      firebaseSet(coinRef, newAmount);
      const currPoke = props.currentTarget.getAttribute("data-value");
      const pokePic = props.currentTarget.getAttribute("data-picture");
      const newPoke = {
        "name": currPoke,
        "img": pokePic
      }
      const collectionRef = ref(db, "userlist/" + currentUser.userId + "/collection");
      firebasePush(collectionRef, newPoke)
      setMessage("Purchase Successful");
    }else {
      setMessage("Insufficient Funds");
    }
  }

  const filteredPoke = pokeData.filter((pokemon) => {
    if ((isSearchedPokemonCollection(searchQuery, pokemon.name) || searchQuery === '')) {
        return true;
    } else {
        return false;
    }
  })


  const shopChoiceDisplay = filteredPoke.map((currPoke) => {
    const builtChoice = <ShopChoice
      key={currPoke.name}
      pokemonName={currPoke.name}
      pokemonPic={currPoke.img}
      handelPurchance={handelPurchance}
      />
    return builtChoice;
  });

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
        <div className="user-message-shop-feedback">{message}</div>
        <button onClick={handleCollectionClick} type="button" className="shop-button">View Collection</button>
        <div className="shop-item-grid">
          {shopChoiceDisplay}
        </div>
      </div>
  </div>
  )
}

function ShopChoice(props){
  const pokeImg = props.pokemonPic;
  const pokeName = props.pokemonName;
  const handelPurchance = props.handelPurchance

  return(
    <div className="shop-article">
      <img src={pokeImg} alt={pokeName} className="shop-choice"/>
      <p>{pokeName}</p>
      <div className="shop-price">
        <p>5 Coins</p>
        <img src={"img/shop-coin.png"} alt="coin" className="shop-coin"/>
      </div>
      <button className="shop-button" data-value={pokeName} data-picture={pokeImg} onClick={handelPurchance}>Purchase Pokemon</button>
    </div>
  )
}
