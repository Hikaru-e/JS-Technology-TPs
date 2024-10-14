import { getPokemons, getPokemonData } from './pokemonService.js';
import { attack } from './utils.js';

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

const battle = async (playerPokemon, botPokemon) => {
    // Basic battle loop
    playerPokemon.hp = 300;
    botPokemon.hp = 300;

    while (playerPokemon.hp > 0 && botPokemon.hp > 0) {
        // Player move selection
        const { move: playerMove } = await prompts({
            type: 'select',
            name: 'move',
            message: 'Choose your move',
            choices: playerPokemon.moves.map(move => ({ title: move.name, value: move }))
        });

        // Bot selects a random move
        const botMove = botPokemon.moves[Math.floor(Math.random() * botPokemon.moves.length)];

        // Apply attacks
        attack(playerPokemon, botPokemon, playerMove);
        if (botPokemon.hp <= 0) break;

        attack(botPokemon, playerPokemon, botMove);
        if (playerPokemon.hp <= 0) break;
    }

    console.log(playerPokemon.hp > 0 ? "You win!" : "You lose!");
};

const main = async () => {
    const selectedPokemon = await selectPokemon();
    const playerPokemon = await getPokemonData(selectedPokemon);

    // Select a bot Pokémon
    const botPokemonName = (await getPokemons())[0];
    const botPokemon = await getPokemonData(botPokemonName);

    console.log(`You are battling ${botPokemon.name}!`);
    await battle(playerPokemon, botPokemon);
};

main();