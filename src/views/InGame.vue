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
            <b-card-text
              >Account :
              {{
                new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "EUR"
                }).format(player.account)
              }}</b-card-text
            >
            <b-card-footer footer-bg-variant="dark" footer-text-variant="light">
              <b-button-group class="group-btn-player">
                <b-button
                  @click="startCase(player)"
                  class="btn-money startCase"
                >
                  <b-icon icon="arrow90deg-right"></b-icon>
                </b-button>
                <b-button
                  v-b-modal.bankMoney
                  @click="initModalAdd(player)"
                  class="btn-money addMoney"
                >
                  <b-icon icon="chevron-double-up"></b-icon>
                  <b-icon icon="credit-card2-back"></b-icon>
                </b-button>
                <b-button
                  v-b-modal.bankMoney
                  @click="initModalSubtract(player)"
                  class="btn-money lessMoney"
                >
                  <b-icon icon="chevron-double-down"></b-icon>
                  <b-icon icon="credit-card2-back"></b-icon>
                </b-button>
                <b-button
                  v-b-modal.transactionMoney
                  @click="initModalTransaction(player)"
                  class="btn-money transaction"
                >
                  <b-icon icon="arrow-left-right"></b-icon>
                  <b-icon icon="credit-card2-back"></b-icon>
                </b-button>
              </b-button-group>
            </b-card-footer>
          </b-card>
        </li>
      </ul>
    </div>
    <b-modal
      id="bankMoney"
      ref="modal"
      :title="titleModal"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <div>Player : {{ playerFocus.name }}</div>
        <b-form-group
          :state="amountState"
          label="Amount"
          label-for="amount-input"
          invalid-feedback="An amount is required"
        >
          <b-form-input
            id="amount-input"
            v-model="amount"
            :state="amountState"
            type="number"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
    <b-modal
      id="transactionMoney"
      ref="modal"
      :title="titleTransaction"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOkTransaction"
    >
      <form ref="form" @submit.stop.prevent="handleSubmitTransaction">
         <b-form-group
         :state = "creditState"
          label="Joueur crediteur : "
          label-for="credit-select"
          invalid-feedback="Choose a player"
          >
            <b-form-select v-model="selectedCredit" id="credit-select" class="mb-3">
              <b-form-select-option :value="null"
                >Selectionne un joueur</b-form-select-option
              >
              <b-form-select-option
                v-for="player in players"
                :key="player.id"
                :value="player.id"
                >{{ player.name }}</b-form-select-option
              >
            </b-form-select>
         </b-form-group>
        <b-form-group
          :state="amountTransactionState"
          label="Amount"
          label-for="amount-input"
          invalid-feedback="An amount is required"
        >
          <b-form-input
            id="amountTransaction-input"
            v-model="amountTransaction"
            :state="amountTransactionState"
            type="number"
            required
          ></b-form-input>
          <b-form-group
          :state = "debitState"
            label="Joueur debiteur : "
            label-for="debit-select"
            invalid-feedback="Choose a player">
            <b-form-select v-model="selectedDebit" id="debit-select" class="mb-3">
              <b-form-select-option :value="null"
                >Selectionne un joueur</b-form-select-option
              >
              <b-form-select-option
                v-for="player in players"
                :key="player.id"
                :value="player.id"
                >{{ player.name }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { playerRepository } from '../shared';

export default {
  name: 'InGame',
  data() {
    return {
      playerName: '',
      gameId: parseInt(this.$route.params.id, 10),
      playerFocus: {},
      amountState: null,
      amount: 0,
      mode: null,
      titleModal: '',
      titleTransaction: '',
      creditState: null,
      debitState: null,
      amountTransaction: 0,
      amountTransactionState: null,
      selectedDebit: null,
      selectedCredit: null,
    };
  },
  created() {
    this.$store
      .dispatch('fetchPlayers', this.gameId)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  },
  computed: {
    players() {
      return this.$store.state.players;
    },
  },
  methods: {
    newPlayer(playerName) {
      // eslint-disable-next-line no-console
      console.log(playerName);
      playerRepository
        .addPlayer(playerName, this.gameId)
        .then(this.$router.push({ name: 'InGame' }))
        .catch(err => console.log(err));
    },
    startCase(player) {
      console.log(player);
      // eslint-disable-next-line no-param-reassign
      player.account += 2000000;
      this.$store.dispatch('modifyPlayer', player);
    },
    initModalAdd(player) {
      this.playerFocus = player;
      this.mode = 'add';
      this.titleModal = "Tu reçois de l'argent !!";
    },
    initModalSubtract(player) {
      this.playerFocus = player;
      this.mode = 'subtract';
      this.titleModal = "Tu dois de l'argent !!";
    },
    resetModal() {
      this.amount = 0;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.amountState = valid;
      return valid;
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      console.log(this.playerFocus);
      if (this.mode === 'add') {
        this.playerFocus.account += parseInt(this.amount, 10);
      } else {
        this.playerFocus.account -= parseInt(this.amount, 10);
      }

      this.$store.dispatch('modifyPlayer', this.playerFocus);

      this.$nextTick(() => {
        this.$bvModal.hide('bankMoney');
      });
    },
    initModalTransaction(player) {
      this.playerFocus = player;
      this.selectedCredit = player.id;
      this.selectedDebit = null;
      this.titleTransaction = 'Attention flux financier !!';
      this.amountTransaction = 0;
    },
    checkFormValidityTransactoin() {
      if (this.selectedCredit === null
          || this.selectedDebit === null
          || this.selectedCredit === this.selectedDebit) {
        this.amountTransactionState = false;
      } else {
        this.amountTransactionState = true;
      }
      return this.amountTransactionState;
    },
    handleOkTransaction(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmitTransaction();
    },
    handleSubmitTransaction() {
      // Exit when the form isn't valid
      if (!this.checkFormValidityTransactoin()) {
        return;
      }

      let playerCredit = this.players.filter(player => player.id === this.selectedCredit);
      let playerDebit = this.players.filter(player => player.id === this.selectedDebit);

      console.log(playerCredit);
      console.log(playerDebit);
      playerCredit[0].account += parseInt(this.amountTransaction, 10);
      playerDebit[0].account -= parseInt(this.amountTransaction, 10);

      this.$store.dispatch('modifyPlayer', playerCredit[0]);
      this.$store.dispatch('modifyPlayer', playerDebit[0]);

      this.$nextTick(() => {
        this.$bvModal.hide('transactionMoney');
      });
    },
  },
};
</script>
