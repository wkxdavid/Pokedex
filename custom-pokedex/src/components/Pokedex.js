import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";

import { LoadingScreen } from "./Loading";
import { PokedexCards } from "./pokedex-components/PokedexCards";
import { isMatchingAbilityPokemon, isSearchedPokemon, hasMatchingType, isMatchingRegionPokemon } from "./helper_functions";

export function PokedexPage(props) {
    const [selectedAbility, setAbility] = useState('All');
    const [selectedTypes, setSelectedType] = useState(new Set());
    const [typesFull, setTypesFull] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [selectedRegions, setSelectedRegion] = useState(new Set());
    const [searchQuery, setSearchQuery] = useState('');
    const pokemonTypes = ['normal', 'fire', 'water', 'grass', 'flying', 'fighting',
                          'poison', 'electric', 'ground', 'rock', 'psychic', 'ice',
                          'bug', 'ghost', 'steel', 'dragon', 'dark', 'fairy'];
    const pokemonRegions = ['kanto', 'johto', 'hoenn', 'sinnoh'];

    useEffect(() => {
        setTypesFull(selectedTypes.size >= 2)
    }, [selectedTypes.size]);

    function handleChange(event) {
        event.preventDefault();
        setSearchQuery(event.target.value);
    }

    function toggleDisplay() {
        setToggle(!toggle);
    }

    function clearFilters() {
        setSelectedType(new Set());
        setSelectedRegion(new Set());
        setAbility('All');
    }

    function handleTypeChange(event) {
        const pokemonType = event.target.value;
        if (selectedTypes.delete(pokemonType)) {
            setSelectedType(new Set(selectedTypes))
        } else {
            setSelectedType(new Set(selectedTypes.add(pokemonType)));
        }
    }

    function handleRegionChange(event) {
        const region = event.target.value;
        if (selectedRegions.has(region)) {
            selectedRegions.delete(region)
            setSelectedRegion(new Set(selectedRegions))
        } else {
            setSelectedRegion(new Set(selectedRegions.add(region)));
        }
    }

    function handleAbilityChange(event) {
        const option = event.target.value;
        setAbility(option);
    }

    function handleDismissAlertClick() {
        props.setAlert(null)
    }

    const typeForm = pokemonTypes.map((type) => {
        return (
            <div key={type}>
                <input type="checkbox" id={type} value={type} name={type} disabled={typesFull && !selectedTypes.has(type)} checked={selectedTypes.has(type)} onChange={handleTypeChange}/>
                <label className={type + " type-btn"} htmlFor={type}></label>
            </div>
        )
    })

    const regionForm = pokemonRegions.map((region) => {
        return (
            <div key={region}>
                <input type="checkbox" id={region} value={region} name={region} checked={selectedRegions.has(region)} onChange={handleRegionChange}/>
                <label className="region" htmlFor={region}>{region}</label>
            </div>
        )
    })

    let abilities = new Set();
    for (let i = 0; i < props.data.length; i++) {
        abilities.add(props.data[i].ability);
    }
    abilities.add('All');
    abilities = Array.from(abilities).sort();

    const abilityForm = abilities.map((ability) => {
        return (
            <option key={ability} value={ability}>{ability}</option>
        )
    })

    const pokemonData = props.data.filter((pokemon) => {
        if ((isSearchedPokemon(searchQuery, pokemon.id, pokemon.name) || searchQuery === '') &&
            (isMatchingAbilityPokemon(selectedAbility, pokemon.ability) || selectedAbility === 'All') &&
            (hasMatchingType(selectedTypes, pokemon.type1, pokemon.type2) || selectedTypes.size === 0) &&
            (isMatchingRegionPokemon(selectedRegions, pokemon.region) || selectedRegions.size === 0)) {
            return true;
        } else {
            return false;
        }
    })


    return (
        <main>
            <section className="search-and-surprise">
                <form onSubmit={handleChange} className="pokedex-form">
                    <label htmlFor="pokename">Search by name or pok&eacute;dex number</label>
                    <input onChange={handleChange} aria-label="search-bar" className="search-bar" type="text" id="pokename" name="pokename" required />
                </form>
            </section>
            <section className={(toggle) ? "show filters" : "hide filters"}>
                <div className="filter-options">
                    <section className="type-filter">
                        <p>Type</p>
                        <div className="type-checkbox">
                            <form>
                                {typeForm}
                            </form>
                        </div>
                    </section>
                    <div className="right-side">
                        <section className="ability-filter">
                            <p>Ability</p>
                            <select onChange={handleAbilityChange} name="ability" className="ability">
                                {abilityForm}
                            </select>
                        </section>
                        <section className="generation-filter">
                            <p>Region</p>
                            <div className="region-checkbox">
                                <form>
                                    {regionForm}
                                </form>
                            </div>
                        </section>
                    </div>
                </div>
                <section className="filter-buttons">
                    <button onClick={clearFilters} aria-label="reset-button" className="reset-btn" type="button">Reset</button>
                </section>
                <div className="hidden">
                    <img src={"img/filter.png"} alt="drop down tab"/>
                    <div className="filter-position">
                        <p onClick={toggleDisplay}>Hide Advanced Search</p>
                    </div>
                    <div className="filter-position-icon">
                        <img onClick={toggleDisplay} src={"/img/up.png"} alt="up arrow" />
                    </div>
                </div>
            </section>
            <section  className={(toggle) ? "hide filters" : "show filters"}>
                <div>
                    <img className="drop-tab" src={"img/filter.png"} alt="drop down tab" />
                    <div className="filter-position">
                        <p onClick={toggleDisplay}>Show Advanced Search</p>
                    </div>
                    <div className="filter-position-icon">
                        <img onClick={toggleDisplay} src={"img/down.png"} alt="down arrow" />
                    </div>
                </div>
            </section>
            {props.alert &&
            <Alert variant="danger" dismissible onClose={handleDismissAlertClick}>{props.alert}</Alert>
            }
            {props.isLoading && <LoadingScreen />}
            <PokedexCards data={pokemonData} />
        </main>
    )
}