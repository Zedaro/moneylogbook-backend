<template>
  <div>
    <repeating-transaction-item v-for="(repeatingTransaction, index) in this.$store.getters.getRepeatingTransactions" :key="index"
                      :color="repeatingTransaction.color" :name="repeatingTransaction.name" :description="repeatingTransaction.description" :money="repeatingTransaction.money" :moneyAccount="repeatingTransaction.moneyAccount" :startingDate="repeatingTransaction.startingDate" :endingDate="repeatingTransaction.endingDate" :rhythmNumber="repeatingTransaction.rhythmNumber" :rhythmType="repeatingTransaction.rhythmType" :index="index">
    </repeating-transaction-item>
  </div>
</template>

<script>
import RepeatingTransactionItem from "./RepeatingTransactionItem";
export default {
  name: "RepeatingTransactionsList",
  components: { RepeatingTransactionItem }
}
</script>

<style scoped>

</style>
