<template>

  <v-card class="list-item" :to="moneyAccountsExist ? item : ''">
    <div class="colorFrom" :style="{ backgroundColor: colorFrom }"></div>
    <div class="colorTo" :style="{ backgroundColor: colorTo }"></div>
    <v-card-title class="card-title">{{ this.name }}</v-card-title>
    <v-card-text class="text-center grey--text">{{ this.description }}</v-card-text>
    <v-card-text class="text-center subtitle-1 money">{{ $t('moneyFormat.format').format(this.money) }}</v-card-text>
    <v-card-text class="text-center grey--text">Von: {{ this.from }}</v-card-text>
    <v-card-text class="text-center grey--text">Zu: {{ this.to }}</v-card-text>
    <v-card-text class="text-center grey--text">{{ formattedDate }}</v-card-text>
  </v-card>

</template>



<script>
export default {
  name: "TransferItem",
  props: ['colorFrom', 'colorTo', 'name', 'description', 'money', 'from', 'to', 'date', 'index'],
  computed: {
    moneyAccountsExist() {
      const accountFrom = this.$store.getters.getMoneyAccounts.find(account => account.name === this.from);
      const accountTo = this.$store.getters.getMoneyAccounts.find(account => account.name === this.to);

      return (typeof accountFrom != 'undefined'  &&  typeof accountTo != 'undefined');
    },
    item() {
      return {
        name: 'transferForm',
        params: { item: this.index }
      };
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
  margin: auto;
}

.colorFrom {
  position: absolute;
  width: 2.5%;
  height: 100%;
  /*background-color: pink;*/
}

.colorTo {
  position: absolute;
  left: 97.5%;
  width: 2.5%;
  height: 100%;
  /*background-color: pink;*/
}

.v-card__title {
  justify-content: center;
}

.money {
  padding-bottom: 0;
}

</style>