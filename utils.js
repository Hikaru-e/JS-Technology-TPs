export const attack = (attacker, defender, move) => {
    const damage = move.power;
    defender.hp -= damage;
    console.log(`${attacker.name} used ${move.name} and dealt ${damage} damage to ${defender.name}`);
  };