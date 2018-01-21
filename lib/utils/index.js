const fs = require('fs');
const path = require('path');
const _ = require('lodash');

let dataFilepath;

function addGameData(title, timestamp, userid, user) {
  const gameData = readData();
  const gameObj = {
    title,
    timestamps: [timestamp],
    users: [{
      userid,
      user
    }]
  };
  if (!gameData.filter(game => game.title === title).length) {
    gameData.push(gameObj);
    saveData(gameData);
    return gameObj;
  }
  return undefined;
}

function removeGameData(toDelete) {
  const gameData = readData();
  const game = _.remove(gameData, { toDelete })[0];
  if (game) {
    saveData(gameData);
  }
  return game;
}

function getGameData(toFind) {
  const gameData = readData();
  const game = _.find(gameData, { toFind });
  return game;
}

function listGameData() {
  return readData();
}

function setGameDataFilepath(filepath) {
  dataFilepath = path.join(filepath);
}

function readData() {
  let data = [];
  if (fs.existsSync(dataFilepath)) {
    const json = fs.readFileSync(dataFilepath);
    data = JSON.parse(json);
  }
  return data;
}

function saveData(data) {
  const json = JSON.stringify(data, null, 2);
  fs.writeFileSync(dataFilepath, json);
}

module.exports = {
  setGameDataFilepath,
  addGameData,
  removeGameData,
  listGameData,
  getGameData
};
