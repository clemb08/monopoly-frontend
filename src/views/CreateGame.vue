/* eslint-disable no-console */
<template>
  <div>
      <b-input-group prepend="Name" class="col-6">
        <b-form-input type='text' id="nameGame" v-model="gameName"></b-form-input>
        <b-input-group-append>
          <b-button variant="success" @click="newGame(gameName)">
            Save
          </b-button>
        </b-input-group-append>
      </b-input-group>
  </div>
</template>

<script>
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
      this.$store.dispatch('addGame', gameName)
        .then(this.$router.push({ name: 'Games' }))
        .catch(err => console.log(err));
    },
  },
};
</script>
