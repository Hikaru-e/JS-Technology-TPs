import { getPokemons, getPokemonData  } from './pokemonService.js';

const testFetching = async () => {
  const pokemons = await getPokemons();
  console.log("Pokemons fetched:", pokemons);
};

testFetching();

const testPokemonMoves = async () => {
    const pokemon = await getPokemonData("pikachu");
    console.log("Pokemon fetched:", pokemon);
  };
  
  testPokemonMoves();