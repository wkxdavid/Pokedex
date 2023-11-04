export function isSearchedPokemon(searchQuery, pokemonId, pokemonName) {
  if ((pokemonName.includes(searchQuery) || pokemonId.toString() === searchQuery)) {
    return true;
  }
  return false;
}

export function isSearchedPokemonCollection(searchQuery, pokemonName) {
  if ((pokemonName.includes(searchQuery))) {
    return true;
  }
  return false;
}

export function isMatchingAbilityPokemon(selectedAbility, pokemonAbility) {
  if (selectedAbility === pokemonAbility) {
    return true;
  }
  return false;
}

export function hasMatchingType(selectedTypes, pokemonType1, pokemonType2) {
  if (selectedTypes.size === 1) {
    return selectedTypes.has(pokemonType1) || selectedTypes.has(pokemonType2);
  } else if (selectedTypes.size === 2) {
    return selectedTypes.has(pokemonType1) && selectedTypes.has(pokemonType2);
  }
  return false;
}

export function isMatchingRegionPokemon(selectedRegion, pokemonRegion) {
  return selectedRegion.has(pokemonRegion);
}

export function leftNeighbor(pokeId) {
  if (pokeId === 1) {
    return 494;
  } else {
    return pokeId - 1;
  }
}

export function rightNeighbor(pokeId) {
  if (pokeId === 494) {
    return 1;
  } else {
    return pokeId + 1;
  }
}