<template>

  <v-card class="list-item" :to="moneyAccountsExist ? item : ''">

    <div class="color" :style="{ backgroundColor: color }"></div>

    <v-card-text class="text-center grey--text date">{{ formattedDate }}</v-card-text>
    <!-- <v-card-text class="text-center grey--text description">{{ this.description }}</v-card-text> -->

    <div class="money-div">
      <v-card-text class="text-center money" :class="moneyColor">{{ $t('moneyFormat.format').format(this.money) }}</v-card-text>
    </div>

    <div class="money-account-div">
      <v-card-text class="text-center money-account">{{ this.moneyAccount }}</v-card-text>
    </div>

    <div class="name-div">
      <v-card-text class="text-center grey--text name">{{ this.name }}</v-card-text>
    </div>

  </v-card>

</template>



<script>
export default {
  name: "TransactionItem",
  props: ['color', 'name', 'description', 'money', 'moneyAccount', 'date', 'index'],
  computed: {
    moneyAccountsExist() {
      const account = this.$store.getters.getMoneyAccounts.find(account => account.name === this.moneyAccount);

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