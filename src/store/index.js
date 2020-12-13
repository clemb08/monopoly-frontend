import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
Vue.use(axios);

const store = new Vuex.Store({
  state: {
    games: [],
    game: null,
    players: [],
    player: null,
  },

  mutations: {
    setGames(state, games) {
      state.games = games;
    },
    setGame(state, game) {
      state.game = game;
      state.games.push(game);
    },
    setPlayers(state, players) {
      state.players = players;
    },
    setPlayer(state, player) {
      state.player = player;
      state.players.push(player);
    },
    mutatePlayer(state, player) {
      state.player = player;
      state.players = state.players.map(p => (p.id === player.id ? player : p));
    },
  },
  actions: {
    fetchGames({ commit }) {
      axios.get('http://localhost:8080/api/game/all')
        .then(res => commit('setGames', res.data));
    },
    addGame({ commit }, game) {
      return axios.post(`http://localhost:8080/api/game/add?name=${game}`)
        .then(res => commit('setGame', res.data));
    },
    fetchPlayers({ commit }, id) {
      axios.get(`http://localhost:8080/api/player/game?id=${id}`)
        .then(res => commit('setPlayers', res.data));
    },
    addPlayer({ commit }, playerName, gameId) {
      return axios.post(`http://localhost:8080/api/player/add?game=${gameId}`,
        { name: playerName })
        .then(res => commit('setPlayer', res.data));
    },
    modifyPlayer({ commit }, player) {
      return axios.put(`http://localhost:8080/api/player/modify?id=${player.id}`, { account: player.account })
        .then(res => commit('mutatePlayer', res.data))
        .catch(err => console.log(err));
    },
  },
});

export default store;
