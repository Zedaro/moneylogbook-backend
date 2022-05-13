<template>
  <div>
    <doughnut-chart></doughnut-chart>
    <money-accounts-list></money-accounts-list>
    <!-- <button @click="test">Test</button> -->
    <!-- <button id="newLocalStorageButton" @click="newLocalStorage">New localStorage</button> -->
  </div>

</template>

<script>
import DoughnutChart from "./chart/DoughnutChart";
import MoneyAccountsList from "./moneyAccounts/page/MoneyAccountsList";
export default {
  name: "OverviewPage",
  components: { DoughnutChart, MoneyAccountsList },
  methods: {
    test() {

    },
    newLocalStorage() {
      localStorage.clear();
      const state = {
        toolbarTitle: 'Übersicht',
        moneyAccounts: [
          {
            name: 'Sparkasse',
            money: 1000,
            color: "#EA0A8E"
          },
          {
            name: 'ING DiBa',
            money: 2000,
            color: "#FF6600"
          }
        ]
      };
      localStorage.setItem('state', JSON.stringify(state));
      window.location.reload();
    }
  }
}
</script>

<style scoped>

</style>
