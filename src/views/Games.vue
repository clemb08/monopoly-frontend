<template>
  <div>
    Test
  </div>
</template>

<script>
import { gameRepository } from '../shared';

export default {
  name: 'Games',
  async beforeMount() {
    console.log('Hello');
    await this.loadGames();
  },
  methods: {
    loadGames: async () => {
      await gameRepository.getGames();
    },
  },
};
</script>
