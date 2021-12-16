<template>
  <div class="page-div">
    <transactions-list></transactions-list>
  </div>
</template>

<script>
import TransactionsList from "./TransactionsList";
export default {
  name: "TransactionsPage",
  components: { TransactionsList },
  mounted() {
    //this.$store.dispatch('setTitle', 'Transaktionen');
  }
}
</script>

<style scoped>

</style>
