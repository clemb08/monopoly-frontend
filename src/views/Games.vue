<template>
  <div class="container">
    <h2>Games</h2>
    <ul>
      <li class="col-6" v-for="game in games" :key="game.id">
        <b-card title="">
          <b-card-title>{{ game.name }}</b-card-title>
          <div class="name">
            Créé le {{ game.createdAt }}
          </div>
          <b-button variant="danger">Delete</b-button>
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
