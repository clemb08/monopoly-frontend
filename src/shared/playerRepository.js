/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import * as axios from 'axios';

const parseList = (response) => {
  if (response.status !== 200) throw Error(response.message);
  if (!response.data) return [];
  let list = response.data;
  if (typeof list !== 'object') {
    list = [];
  }
  return list;
};

const getPlayers = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/player/all');

    const data = parseList(response);

    if (data == null) {
      console.log('Nada');
    }

    const players = data.map(player => player);
    console.log(players);
    return players;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getPlayerByGameId = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/player/game?id=${id}`);

    const data = parseList(response, 200);
    if (data == null) {
      console.log('Nada');
    }

    const players = data.map(player => player);
    return players;
  } catch (error) {
    console.log(error);
    return null;
  }
};

async function addPlayer(playerName, gameId) {
  try {
    console.log(`${playerName} ${gameId}`);
    const res = await axios.post(`http://localhost:8080/api/player/add?game=${gameId}`,
      { name: playerName });
    console.log(res.data);
    return playerName;
  } catch (error) {
    console.log(error);
    return null;
  }
}


export const playerRepository = {
  getPlayers,
  getPlayerByGameId,
  addPlayer,
};
