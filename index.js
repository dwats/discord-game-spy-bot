const Discord = require('discord.io');
const {
  setGameDataFilepath,
  addGameData,
  removeGameData,
  listGameData,
  getGameData,
  editGameData
} = require('./lib/utils');
require('dotenv').config();

const bot = new Discord.Client({
  token: process.env.DISCORD_TOKEN,
  autorun: true
});

bot.on('ready', () => {
  console.log(`Connected as ${bot.username} (${bot.id})`);
  setGameDataFilepath(process.env.DATA_PATH);
});

bot.on('presence', (user, uid, status, game) => {
  if (game && !getGameData(game.name)) {
    console.log(`New Entry! ${game.name}, ${user}`);
    addGameData(game.name, game.timestamps.start, uid, user);
  }
  else if (game && getGameData(game.name)) {
    console.log(`Entry updated! ${game.name}, ${user}`);
    editGameData(game.name, game.timestamps.start, uid, user);
  }
});
