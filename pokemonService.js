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

export const getPokemonData = async (pokemonName) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const data = await response.json();

        const moves = data.moves.slice(0, 10).map(move => ({
            name: move.move.name,
            url: move.move.url
        }));

        return {
            name: data.name,
            id: data.id,
            moves: moves
        };
    } catch (error) {
        console.error(`Error fetching data for ${pokemonName}:`, error.message);
        return null;
    }
};