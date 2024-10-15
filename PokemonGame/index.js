#!/usr/bin/env node
import prompts from 'prompts';
import { getPokemons, getPokemonData } from './pokemonService.js';
import { getRandomItem, attack } from './utils.js';

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';

async function playPokemonGame() {
    console.log(`
        ____       _                                 ____                      
       |  _ \\ ___ | | _____ _ __ ___   ___  _ __    / ___| __ _ _ __ ___   ___ 
       | |_) / _ \\| |/ / _ \\ '_ \` _ \\ / _ \\| '_ \\  | |  _ / _\` | '_ \` _ \\ / _ \\
       |  __/ (_) |   <  __/ | | | | | (_) | | | | | |_| | (_| | | | | | |  __/
       |_|   \\___/|_|\\_\\___|_| |_| |_|\\___/|_| |_|  \\____|\\__,_|_| |_| |_|\\___|
                                                                               
      `);
      
    

    const pokemons = await getPokemons();
    const playerPokemonName = await choosePokemon(pokemons);
    const botPokemonName = getRandomItem(pokemons);

    console.log(`You are playing against ${botPokemonName}`);

    const playerPokemon = await getPokemonData(playerPokemonName);
    const botPokemon = await getPokemonData(botPokemonName);

    playerPokemon.hp = botPokemon.hp = 300; // Both Pokémon start with 300 HP

    while (playerPokemon.hp > 0 && botPokemon.hp > 0) {
        const playerMove = await chooseMove(playerPokemon);
        const botMove = getRandomItem(botPokemon.moves);

        console.log(`${botPokemon.name} uses ${botMove.name}`);

        attack(playerPokemon, botPokemon, playerMove, botMove);
        if (botPokemon.hp <= 0) break;

        attack(botPokemon, playerPokemon, botMove, playerMove);
    }

    announceWinner(playerPokemon, botPokemon);
}

async function choosePokemon(pokemons) {
    const response = await prompts({
        type: 'select',
        name: 'pokemon',
        message: 'Choose your Pokemon:',
        choices: pokemons.map(pokemon => ({ title: pokemon, value: pokemon }))
    });
    return response.pokemon;
}

async function chooseMove(pokemon) {
    const response = await prompts({
        type: 'select',
        name: 'move',
        message: 'Choose your move:',
        choices: pokemon.moves.map(move => ({
            title: `${move.name} (Power: ${move.power}, Accuracy: ${move.accuracy}, PP: ${move.pp})`,
            value: move
        }))
    });
    return response.move;
}

function announceWinner(playerPokemon, botPokemon) {
    if (playerPokemon.hp <= 0) {
        console.log(RED + `${playerPokemon.name} fainted. You lost!` + RESET);
    } else {
        console.log(GREEN + `${botPokemon.name} fainted. You won!` + RESET);
    }
}

playPokemonGame();

