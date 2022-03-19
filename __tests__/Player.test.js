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

test("Get player's health", () => {
    const player = new Player();

    expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
});

test("Check to see if player is alive or dead", () => {
    const player = new Player();

    expect(player.isAlive()).toBeTruthy();

    player.health = 0;

    expect(player.isAlive()).toBeFalsy();
})

test("subtracts from player's health", () => {
    const player = new Player();
    const oldHealth = player.health;

    player.reduceHealth(5);

    expect(player.health).toBe(oldHealth - 5);

    player.reduceHealth(999999);

    expect(player.health).toBe(0);
})