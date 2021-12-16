<template>
  <div>
    <repeating-transactions-list></repeating-transactions-list>
  </div>
</template>

<script>
import RepeatingTransactionsList from "./RepeatingTransactionsList";
export default {
  name: "RepeatingTransactionsPage",
  components: { RepeatingTransactionsList },
  mounted() {
    //this.$store.dispatch('setTitle', 'Transaktionen');
  }
}
</script>

<style scoped>

</style>
