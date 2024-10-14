export function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

export function attack(attacker, defender, attackerMove, defenderMove) {
    if (attackerMove.pp <= 0) {
        console.log(`${attacker.name}'s ${attackerMove.name} has no PP left!`);
        return;
    }

    attackerMove.pp--;

    if (Math.random() * 100 > attackerMove.accuracy) {
        console.log(`${attacker.name}'s ${attackerMove.name} missed!`);
        return;
    }

    const damage = attackerMove.power;
    defender.hp -= damage;

    console.log(`${attacker.name} used ${attackerMove.name}, dealing ${damage} damage to ${defender.name}!`);
    console.log(`${defender.name}'s remaining HP: ${defender.hp}`);
}
