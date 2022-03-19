const { Player } = require('../lib/Player.js');

const { Potion } = require('../lib/Potion.js');
jest.mock('../lib/Potion.js');

console.log(new Potion());

test("Create a player object", () => {
    const player = new Player("ApolloSolo");

    expect(player.name).toEqual(expect.any(String));
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));

    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
    )
});