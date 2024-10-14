import fetch from 'node-fetch';

export const getPokemons = async (limit = 10) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    const data = await response.json();
    return data.results.map(pokemon => pokemon.name);
  } catch (error) {
    console.error("Error fetching pokemons:", error.message);
    return [];
  }
};