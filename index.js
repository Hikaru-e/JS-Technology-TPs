import { getPokemons, getPokemonData  } from './pokemonService.js';
import prompts from 'prompts';

const selectPokemon = async () => {
    const pokemons = await getPokemons();
  
    const response = await prompts({
      type: 'select',
      name: 'pokemon',
      message: 'Choose your Pokémon',
      choices: pokemons.map(pokemon => ({ title: pokemon, value: pokemon }))
    });
  
    return response.pokemon;
  };
  
  const main = async () => {
    const selectedPokemon = await selectPokemon();
    const pokemonData = await getPokemonData(selectedPokemon);
    console.log("You selected:", pokemonData);
  };
  
  main();