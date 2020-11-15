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
    // eslint-disable-next-line no-console
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
