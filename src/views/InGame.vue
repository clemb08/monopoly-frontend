<template>
  <div class="container">
    <div class="headerGame">
      <b-button
        v-b-toggle.collapseAdd
        class="col-1 btn-add align-self-end"
      >
        <b-icon icon="plus-circle-fill"></b-icon>
      </b-button>

      <b-collapse class="col-6" id="collapseAdd">
        <b-input-group prepend="Name" class="col-6">
          <b-form-input
            type="text"
            id="namePlayer"
            v-model="playerName"
          ></b-form-input>
          <b-input-group-append>
            <b-button variant="success" @click="newPlayer(playerName)">
              Save
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-collapse>
    </div>
    <ul>
      <li class="col-6" v-for="player in players" :key="player.id">
        <b-card>
          <b-card-title>
            {{ player.name }}
          </b-card-title>
        </b-card>
      </li>
    </ul>
  </div>
</template>

<script>
import { playerRepository } from '../shared';

export default {
  name: 'InGame',
  data() {
    return {
      players: [],
      playerName: '',
      gameId: parseInt(this.$route.params.id, 10),
    };
  },
  async created() {
    // eslint-disable-next-line no-console
    await this.loadPlayers(this.gameId);
    console.log(this.players);
  },
  methods: {
    async loadPlayers(gameId) {
      this.players = [];
      this.players = await playerRepository.getPlayerByGameId(gameId);
    },
    newPlayer(playerName) {
      // eslint-disable-next-line no-console
      console.log(playerName);
      playerRepository.addPlayer(playerName, this.gameId);
    },
  },
};
</script>
