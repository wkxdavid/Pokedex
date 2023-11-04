import React from 'react';
import { PokeTitle } from "./pokestats-components/PokeTitle";
import { PokeButtons } from "./pokestats-components/PokeButtons";
import { PokePhysical } from "./pokestats-components/PokePhysical";
import { PokeGraph } from "./pokestats-components/PokeGraph";
import { useParams } from 'react-router';
import { leftNeighbor, rightNeighbor } from './helper_functions.js';


export function PokeStats(props) {

    const urlParam = useParams();

    let currentPokemon = props.data.filter((pokemon) => {
             return pokemon.name === urlParam.name;
    });


    let correctPokemon = currentPokemon[0];
    let leftPokemon = props.data[leftNeighbor(correctPokemon.id) - 1];
    let rightPokemon = props.data[rightNeighbor(correctPokemon.id) - 1];

    let heightData = correctPokemon.height;
    let categoryData = correctPokemon.category;
    let weightData = correctPokemon.weight;
    let abilitiesData = correctPokemon.ability;
    let gender = () => {
        let output = "";
        if (correctPokemon.gender.male === true) {
            output += "Male"
        }
        if (correctPokemon.gender.female === true) {
            if (output === "Male") {
                output += " and Female";
            } else {
                output += "Female";
            }
        }
        return output;
    }
    let fullGender = gender();

        return (
                    <main>
                        <PokeTitle data={correctPokemon} />
                        <PokeButtons left={leftPokemon} right={rightPokemon}/>
                        <div className="back-and-forward">
                            <img src={correctPokemon.img} alt={correctPokemon.name} />
                            <PokePhysical height={heightData}
                                          category={categoryData}
                                          weight={weightData}
                                          abilities={abilitiesData}
                                          gender={fullGender}
                                />
                        </div>
                        <div className="graph">
                            <PokeGraph hp={correctPokemon['HP']}
                                       attack={correctPokemon['Attack']}
                                       defense={correctPokemon['Defense']}
                                       spAttack={correctPokemon['Sp. Attack']}
                                       spDefense={correctPokemon['Sp. Defense']}
                                       speed={correctPokemon['Speed']}
                            />
                        </div>
                    </main>
        );
}