import React, { useState } from "react";
import { Link } from "react-router-dom";

export function PokedexCards(props) {

    const [currentPokemonNumber, changePokemonNumber] = useState(20);

    function handleClick() {
      changePokemonNumber(currentPokemonNumber + 20);
    }

    const pokemonCards = props.data.slice(0, currentPokemonNumber).map((pokemon) => {
        if (pokemon.type2 !== null) {
            return (
                <Link className="link" key={pokemon.name} to={`about/${pokemon.name}`}>
                    <div className="pokemon-card">
                        <div className="pokemon-img">
                            <img className={pokemon.type1 + "-border"} src={pokemon.img} alt={pokemon.name} />
                        </div>
                        <div className="pokemon-text">
                            <p className="number">#{pokemon.number}</p>
                            <p className="name">{pokemon.name}</p>
                        </div>
                        <div className="type">
                            <img src={pokemon.type1Img} alt={pokemon.type1 + " type symbol"}/>
                            <img src={pokemon.type2Img} alt={pokemon.type2 + " type symbol"}/>
                        </div>
                        <div className="type-icon">
                            <img src={pokemon.type1SmallImg} alt={pokemon.type1 + " type symbol"}/>
                            <img src={pokemon.type2SmallImg} alt={pokemon.type2 + " type symbol"} />
                        </div>
                    </div>
                </Link>
            )
        }
        return (
            <Link  className="link" key={pokemon.name} to={`about/${pokemon.name}`}>
                <div key={pokemon.name + 'pokedex'} className="pokemon-card">
                    <div className="pokemon-img">
                        <img className={pokemon.type1 + "-border"} src={pokemon.img} alt={pokemon.name} />
                    </div>
                    <div className="pokemon-text">
                        <p className="number">#{pokemon.number}</p>
                        <p className="name">{pokemon.name}</p>
                    </div>
                    <div className="type">
                        <img src={pokemon.type1Img} alt={pokemon.type1 + " type symbol"}/>
                    </div>
                    <div className="type-icon">
                        <img src={pokemon.type1SmallImg} alt={pokemon.type1 + " type symbol"}/>
                    </div>
                </div>
            </Link>
        )
    });

    return (
        <div>
            <section id="dex" className="pokemon-cards">
                {pokemonCards}
            </section>
            <section className="load">
                <button onClick={handleClick} aria-label="load-more-button" className="load-btn" type="button">Load more pok&eacute;mon</button>
            </section>
        </div>
    )
}