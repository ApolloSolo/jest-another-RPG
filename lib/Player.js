const { Potion } = require('../lib/Potion.js')

function Player(name) {
  this.randomName = [
    "Billy",
    "Finn",
    "Jake",
    "Princess Peach",
    "Marceline the Vampire Queen",
  ];
  this.name =
    name || this.randomName[Math.floor(Math.random() * this.randomName.length)];

  this.health = Math.floor(Math.random() * 10 + 95);
  this.strength = Math.floor(Math.random() * 5 + 7);
  this.agility = Math.floor(Math.random() * 5 + 7);

  this.inventory = [new Potion('health'), new Potion()];
}

module.exports = {
  Player,
};
