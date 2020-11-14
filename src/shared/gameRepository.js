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

export const gameRepository = {
  getGames,
  getGameById,
};
