/* eslint-disable no-console */
<template>
  <div>
      <label for="nameGame">Name</label>
      <input type='text' id="nameGame" v-model="gameName"/>
      <button type="submit" @click="newGame(gameName)">Save</button>
  </div>
</template>

<script>
import { gameRepository } from '../shared';

export default {
  name: 'CreateGame',
  data() {
    return {
      gameName: '',
    };
  },
  beforeMount() {
    this.game = {
      name: '',
    };
  },
  methods: {
    newGame(gameName) {
      // eslint-disable-next-line no-console
      console.log(gameName);
      gameRepository.addGame(gameName);
    },
  },
};
</script>
