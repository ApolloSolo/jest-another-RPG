const { Player } = require("../lib/Player.js");

const { Potion } = require("../lib/Potion.js");
jest.mock("../lib/Potion.js");

console.log(new Potion());

test("Create a player object", () => {
  const player = new Player("ApolloSolo");

  expect(player.name).toEqual(expect.any(String));
  expect(player.health).toEqual(expect.any(Number));
  expect(player.strength).toEqual(expect.any(Number));
  expect(player.agility).toEqual(expect.any(Number));

  expect(player.inventory).toEqual(
    expect.arrayContaining([expect.any(Object)])
  );
});

test("Get player's stats as an object", () => {
  const player = new Player();

  expect(player.getStats()).toHaveProperty("potions");
  expect(player.getStats()).toHaveProperty("health");
  expect(player.getStats()).toHaveProperty("strength");
  expect(player.getStats()).toHaveProperty("agility");
});

test("Get inventory from player or return false", () => {
    const player = new Player();

    expect(player.getInventory()).toEqual(expect.any(Array));

    player.inventory = [];

    expect(player.getInventory()).toEqual(false);
});