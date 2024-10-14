import fetch from 'node-fetch';

const POKEAPI_URL = 'https://pokeapi.co/api/v2';

export async function getPokemons(limit = 8) {
    try {
        const response = await fetch(`${POKEAPI_URL}/pokemon?limit=${limit}`);
        const data = await response.json();
        return data.results.map(pokemon => pokemon.name);
    } catch (error) {
        console.error("Error fetching pokemons:", error.message);
        return [];
    }
}

export async function getPokemonData(pokemonName) {
    try {
        const response = await fetch(`${POKEAPI_URL}/pokemon/${pokemonName}`);
        const pokemon = await response.json();

        return {
            name: pokemon.name,
            moves: await getPokemonMoves(pokemon)
        };
    } catch (error) {
        console.error(`Error fetching ${pokemonName} data:`, error.message);
        return null;
    }
}

async function getPokemonMoves(pokemon) {
    const moves = [];
    for (const moveEntry of pokemon.moves.slice(0, 5)) { // Limit to 5 moves
        try {
            const moveResponse = await fetch(moveEntry.move.url);
            const move = await moveResponse.json();
            moves.push({
                name: move.name,
                power: move.power || 50, 
                accuracy: move.accuracy || 100,
                pp: move.pp || 10
            });
        } catch (error) {
            console.error(`Error fetching move:`, error.message);
        }
    }
    return moves;
}
