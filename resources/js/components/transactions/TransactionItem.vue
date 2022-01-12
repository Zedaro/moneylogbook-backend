<template>

  <v-card class="list-item" :to="moneyAccountsExist ? item : ''">

    <div class="color" :style="{ backgroundColor: this.$store.getters.getColor(this.moneyAccountId) }"></div>

    <v-card-text class="text-center grey--text date">{{ formattedDate }}</v-card-text>
    <!-- <v-card-text class="text-center grey--text description">{{ this.description }}</v-card-text> -->

    <div class="money-div">
      <v-card-text class="text-center money" :class="moneyColor">{{ $t('moneyFormat.format').format(this.money) }}</v-card-text>
    </div>

    <div class="money-account-div">
      <v-card-text class="text-center money-account">{{
              this.$store.getters.getMoneyAccountById(this.moneyAccountId).name
          }}</v-card-text>
    </div>

    <div class="name-div">
      <v-card-text class="text-center grey--text name">{{ this.name }}</v-card-text>
    </div>

  </v-card>

</template>



<script>
export default {
  name: "TransactionItem",
  props: ['name', 'description', 'money', 'moneyAccountId', 'date', 'index'],
  computed: {
    moneyAccountsExist() {
      console.log("test");
      console.log("this.moneyAccountId:", this.moneyAccountId);
      console.log("HIER LIEGT DER FEHLER: ", this.$store.getters.getMoneyAccountById(this.moneyAccountId));

      const account = this.$store.getters.getMoneyAccounts.find(account => account.name === this.$store.getters.getMoneyAccountById(this.moneyAccountId).name);//this.moneyAccount);

      return (typeof account != 'undefined');
    },
    item() {
      return {
        name: 'transactionForm',
        params: { item: this.index }
      };
    },
    moneyColor() {
      return ( (this.money > 0) ? 'green--text' : 'red--text' );
    },
    formattedDate() {
      const [year, month, day] = this.date.split('-');
      return `${day}.${month}.${year}`;
    }
  },
  mounted() {
      console.log("TransactionItem mounted this.name:", this.name);
      console.log("TransactionItem mounted this.$store.getters.getMoneyAccountById(this.moneyAccountId).name:", this.$store.getters.getMoneyAccountById(this.moneyAccountId).name);
  }
}
</script>



<style scoped>

.v-card {
  /*
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 10% 40% 40%;
  */

  margin: auto;
}


.name-div{
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 0 10% 5% 10%;
}

.name {
  font-size: 20px;
  min-width: 0;
  word-wrap: break-word;
  padding: 0;
}

.money-div{
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 0 10% 5% 10%;
}

.money {
  font-size: 25px;
  padding: 0;
  min-width: 0;
  word-wrap: break-word;
}

.money-account-div{
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 0 10% 5% 10%;
}

.money-account {
  font-size: 20px;
  padding: 0;
  min-width: 0;
  word-wrap: break-word;
}

.date {
  display: flex;
  justify-content: flex-end;
  align-content: center;
  padding-bottom: 2%;
}

.color {
  position: absolute;
  width: 5%;
  height: 100%;
  background-color: pink;
}

.v-card__title {
  justify-content: center;
}


</style>
