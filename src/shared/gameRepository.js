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

export const parseItem = (response, code) => {
  if (response.status !== code) throw Error(response.message);
  let item = response.data;
  if (typeof item !== 'object') {
    item = undefined;
  }
  return item;
};

const getGames = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/game/all');

    const data = parseList(response);

    if (data == null) {
      console.log('Nada');
    }

    const games = data.map(game => game);
    console.log(games);
    return games;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getGameById = async (id) => {
  try {
    const response = await axios.get(`/api/game/${id}`);

    const game = parseList(response, 200);

    return game;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const addGame = async (game) => {
  try {
    console.log(game);
    const res = await axios.post(`http://localhost:8080/api/game/add?name=${ game}`);
    console.log(res.data);
    return game;
  } catch (error) {
    console.log(error);
    return null;
  }
};


export const gameRepository = {
  getGames,
  getGameById,
  addGame,
};
