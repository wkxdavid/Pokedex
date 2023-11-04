import React from "react";
import{ useState} from "react";
import { getDatabase, ref, set as firebaseSet} from 'firebase/database'

export function GuessingGame(props){
  const randomIndex = Math.floor(Math.random() * props.pokemonInfo.length - 1);
  const randomPokemon = props.pokemonInfo[randomIndex];
  const currentUser = props.currentUser;
  const pokeCoins = props.pokeCoins;

  const [guess, setGuess] = useState("");
  const [pokemon, getPokemon] = useState(randomPokemon);
  const [message, setMessage] = useState("");
  const [guessCount, setCount] = useState(10);
  const [toggle, setToggle] = useState(false);
  const [guessPokemon, setGuessPokemon] = useState([]);

  function toggleDisplay() {
    setToggle(!toggle);
  }

  function handleChange(event) {
    event.preventDefault();
  }

  const checkGuess = (event) => {
    event.preventDefault();
    setCount((guessCount) => guessCount - 1);
    setGuessPokemon([guessPokemon, guess]);
    setMessage(getGameState(guess, pokemon));
    setGuess("");
  }

  function getGameState(guess, pokemon) {
    if (guessCount <= 1) {
      restartGame();
      return "You did not guess the Pokemon in the correct amount of atempts."

    } else if (guess !== pokemon.name) {
      return "You guess incorrectly, try again."

    } else if (guess === pokemon.name) {
      const newAmount = pokeCoins + 5;
      const db = getDatabase();
      console.log(currentUser.userId);
      const coinRef = ref(db, "userlist/" + currentUser.userId + "/coin")
      firebaseSet(coinRef, newAmount);
      restartGame();
      return "You gussed correctly, you gained 5 coins";
    }
  }

  function restartGame() {
    setCount(10);
    setMessage("");
    setGuess("");
    getPokemon(randomPokemon);
    setToggle(false);
  }

  return(
    <div className='game-card-container'>
      <h1 aria-label="Pokedex Quiz Game" className="game-h1">Pok&eacute;dex Quiz Game</h1>
      <div className='game-card'>
        <h2 className='game-name'>Guess the Pokemon</h2>
        <div className='game-pokemon-pic'>
          <section className={(toggle) ? "hide picture" : "show picture"}>
                <div>
                    <img src={pokemon.img} alt={pokemon.name} className='game-pokepic'/>
                    <div className="show picture">
                        <p className="game-hide" onClick={toggleDisplay}>Show Pokemon</p>
                    </div>
                </div>
            </section>
            <section  className={(toggle) ? "show picture" : "hide picture"}>
                <div>
                    <img src={pokemon.img} alt={pokemon.name} className='game-correctpokepic'/>
                    <div className="show picture">
                        <p className="game-hide" onClick={toggleDisplay}>Hide Pokemon</p>
                    </div>
                </div>
            </section>
        </div>
        <div className='game-guess'>
          <form onSubmit={handleChange} className="game-form">
            <input type="text" name="Guess:" onChange={(event) => setGuess(event.target.value)}
              placeholder="Type here." className="game-guessinput" aria-label="Guess an Pokemon's name"
              value={guess}/>
          </form>
          <button className="game-button" onClick={checkGuess} aria-label="Submit guess">Submit</button>
          <div>
            <p>{message}</p>
            <p>Remainding guesses: {guessCount}</p>
            <p>Total Coins Gained: {pokeCoins} </p>
          </div>
        </div>
      </div>
    </div>
  )
}
