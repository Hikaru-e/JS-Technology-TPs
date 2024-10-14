import { getPokemons } from './pokemonService.js';

const testFetching = async () => {
  const pokemons = await getPokemons();
  console.log("Pokemons fetched:", pokemons);
};

testFetching();