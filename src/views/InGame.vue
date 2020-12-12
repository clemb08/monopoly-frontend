<template>
  <div class="container">
    <div class="headerGame">
      <h2 class="col-10">Players</h2>
      <b-button v-b-toggle.collapseAdd class="col-1 btn-add">
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
    <!--Players cards -->
    <div class="listPlayer">
      <ul>
        <li
          class="col-md-10 col-xl-5 card-players"
          v-for="player in players"
          :key="player.id"
        >
          <b-card border-variant="danger">
            <div class="row">
              <b-avatar size="lg"></b-avatar>
              <b-card-title>
                {{ player.name }}
              </b-card-title>
            </div>
            <b-card-text>Account : {{ player.amount }}</b-card-text>
            <b-card-footer footer-bg-variant="dark" footer-text-variant="light">
              <b-button-group class="group-btn-player">
                <b-button class="btn-money">
                  <b-icon icon="arrow90deg-right"></b-icon>
                </b-button>
                <b-button class="btn-money">
                  <b-icon icon="chevron-double-up"></b-icon>
                  <b-icon icon="credit-card2-back"></b-icon>
                </b-button>
                <b-button class="btn-money">
                  <b-icon icon="chevron-double-down"></b-icon>
                  <b-icon icon="credit-card2-back"></b-icon>
                </b-button>
                <b-button class="btn-money">
                  <b-icon icon="arrow-left-right"></b-icon>
                  <b-icon icon="credit-card2-back"></b-icon>
                </b-button>
              </b-button-group>
            </b-card-footer>
          </b-card>
        </li>
      </ul>
    </div>
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
