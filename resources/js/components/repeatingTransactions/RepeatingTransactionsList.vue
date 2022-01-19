<template>
  <div>
    <repeating-transaction-item v-for="(repTransaction, index) in this.$store.getters.getRepeatingTransactions" :key="index"
                      :id="repTransaction.id" :name="repTransaction.name" :description="repTransaction.description" :money="repTransaction.money" :moneyAccountId="repTransaction.moneyAccountId" :startingDate="repTransaction.startingDate" :endingDate="repTransaction.endingDate" :rhythmNumber="repTransaction.rhythmNumber" :rhythmType="repTransaction.rhythmType" :index="index">
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
