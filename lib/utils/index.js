const fs = require('fs');
const path = require('path');
const _ = require('lodash');

let dataFilepath;

function addGameData(title, timestamp, userid, user) {
  const gameData = readData();
  const gameObj = {
    title,
    users: [{
      timestamp,
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

function editGameData(title, timestamp, userid, user) {
  const gameData = readData();
  let game;
  const index = _.findIndex(gameData, { title });
  if (index >= 0 && index < gameData.length) {
    const users = [...gameData[index].users];
    users.push({
      timestamp,
      userid,
      user
    });
    game = {
      title,
      users
    };
    gameData.splice(index, 1, game);
    saveData(gameData);
  }
  return game;
}

function removeGameData(title) {
  const gameData = readData();
  const game = _.remove(gameData, { title })[0];
  if (game) {
    saveData(gameData);
  }
  return game;
}

function getGameData(title) {
  const gameData = readData();
  const game = _.find(gameData, { title });
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
  getGameData,
  editGameData
};
