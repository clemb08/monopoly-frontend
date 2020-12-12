<template>
  <div class="container">
    <div class="row">
      <h2 class="col-10">Games</h2>
      <b-button class="col-1 btn-add align-self-end" @click="goToAdd()">
        <b-icon icon="plus-circle-fill"></b-icon>
      </b-button>
    </div>

    <ul>
      <li class="col-5 game" v-for="game in games" :key="game.id">
        <b-card bg-variant="dark" text-variant="light">
          <b-card-title>{{ game.name }}</b-card-title>
          <div class="row card-content">
            <div class="col-6 date">Créé le {{ game.createdAt }}</div>
            <b-button-group class="group-btn-game">
              <router-link
                class="btn-game"
                :to="{ name: 'InGame', params: { id: game.id } }"
              >
                <b-button variant="outline-success">
                  <b-icon icon="play"></b-icon>
                </b-button>
              </router-link>
              <b-button class="btn-game" variant="outline-danger">
                <b-icon icon="x-circle-fill"></b-icon>
              </b-button>
            </b-button-group>
          </div>
        </b-card>
      </li>
    </ul>
  </div>
</template>

<script>
import { gameRepository } from '../shared';

export default {
  name: 'Games',
  data() {
    return {
      games: [],
    };
  },
  async created() {
    // eslint-disable-next-line no-console
    await this.loadGames();
    console.log(this.games);
  },
  methods: {
    async loadGames() {
      this.games = [];
      this.games = await gameRepository.getGames();
    },
    goToAdd() {
      this.$router.push({ name: 'Add_Games' });
    },
    goToGame(gameId) {
      this.$router.push({ name: 'InGame', params: { gameId } });
    },
  },
};
</script>
