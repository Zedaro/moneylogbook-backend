<template>
  <div class="list-div">
    <transaction-item v-for="(transaction, index) in this.$store.getters.getTransactions" :key="index"
                        :color="transaction.color" :name="transaction.name" :description="transaction.description" :money="transaction.money" :moneyAccount="transaction.moneyAccount" :date="transaction.date" :index="index">
    </transaction-item>
  </div>
</template>

<script>
import TransactionItem from "./TransactionItem";
export default {
  name: "TransactionsList",
  components: { TransactionItem }
}
</script>

<style scoped>

</style>
