const inquirer = require("inquirer");
const { Player } = require("./Player");
const { Enemy } = require("./Enemy");

function Game() {
  this.roundNumber = 0;
  this.isPlayerTrun = false;
  this.enemies = [];
  this.currentEnemy;
  this.player;

  Game.prototype.startNewBattle = function () {
    if (this.player.agility > this.currentEnemy.agility) {
      this.isPlayerTrun = true;
    } else {
      this.isPlayerTrun = false;
    }

    console.log("\n*** Player Stats ***");
    console.table(this.player.getStats());

    console.log(this.currentEnemy.getDescription());

    this.battle();
  };

  Game.prototype.initializeGame = function () {
    this.enemies.push(new Enemy("goblin", "sword"));
    this.enemies.push(new Enemy("orc", "baseball bat"));
    this.enemies.push(new Enemy("skeleton", "axe"));

    this.currentEnemy = this.enemies[0];

    inquirer
      .prompt({
        type: "text",
        name: "name",
        message: "What is your name warrior?",
      })
      .then(({ name }) => {
        this.player = new Player(name);

        this.startNewBattle();
      });
  };

  Game.prototype.battle = function () {
    if (this.isPlayerTrun) {
      inquirer
        .prompt({
          type: "list",
          message: "What would you like to do?",
          name: "action",
          choices: ["Attack", "Use potion"],
        })
        .then(({ action }) => {
          if (action === "Use potion") {
            if(!this.player.getInventory()) {
                console.log("You don't have any potions!");

                return this.checkEndOfBattle();
            }

            inquirer
            .prompt({
                type: 'list',
                message: "Which potion would you like to use?",
                name: 'action',
                choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
            })
            .then(({ action }) => {
                const potionDetails = action.split(': ');

                this.player.usePotion(potionDetails[0] -1);
                console.log(`You used a ${potionDetails[1]} potion.`);

                this.checkEndOfBattle();

            })
          } else {
            const damage = this.player.getAttackValue();
            this.currentEnemy.reduceHealth(damage);

            console.log(`You attacked the ${this.currentEnemy.name}`);
            console.log(this.currentEnemy.getHealth());

            this.checkEndOfBattle();
          }
        });
    } else {
      const damage = this.currentEnemy.getAttackValue();
      this.player.reduceHealth(damage);

      console.log(`You were attacked by the ${this.currentEnemy.name}`);
      console.log(this.player.getHealth());

      this.checkEndOfBattle();
    }
  };

  Game.prototype.checkEndOfBattle = function() {
    if(this.player.isAlive() && this.currentEnemy.isAlive()){
        this.isPlayerTrun = !this.isPlayerTrun;
        this.battle();
    }
    else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
        console.log(`You've defeated the ${this.currentEnemy.name}`);
      
        this.player.addPotion(this.currentEnemy.potion);
        console.log(`${this.player.name} found a ${this.currentEnemy.potion.name} potion`);
      
        this.roundNumber++;
      
        if (this.roundNumber < this.enemies.length) {
          this.currentEnemy = this.enemies[this.roundNumber];
          this.startNewBattle();
        } else {
          console.log('You win!');
        }
      }
      else {
        console.log("You've been defeated!");
      }
  }
}

module.exports = {
  Game,
};
