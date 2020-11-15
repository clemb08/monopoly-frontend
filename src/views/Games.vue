<template>
  <div class="container">
    <h2>Games</h2>
    <ul>
      <li class="col-8" v-for="game in games" :key="game.id">
        <b-card title="">
          <b-card-title>{{ game.name }}</b-card-title>
          <div class="row card-content">
            <div class="col-7 date">Créé le {{ game.createdAt }}</div>
            <b-button class="col-2" variant="success">Play</b-button>
            <b-button class="col-2 align-self-end" variant="danger">Delete</b-button>
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
  },
};
</script>
