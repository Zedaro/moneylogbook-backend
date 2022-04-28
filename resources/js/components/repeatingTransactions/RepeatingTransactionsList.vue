<template>
  <list-component marginT>
    <repeating-transaction-item v-for="(repTransaction, index) in $store.getters.getRepeatingTransactions" :key="index"
                      :id="repTransaction.id" :name="repTransaction.name" :description="repTransaction.description" :money="repTransaction.money" :moneyAccountId="repTransaction.moneyAccountId" :startingDate="repTransaction.startingDate" :endingDate="repTransaction.endingDate" :rhythmNumber="repTransaction.rhythmNumber" :rhythmType="repTransaction.rhythmType" :expired="repTransaction.expired" :index="index">
    </repeating-transaction-item>
  </list-component>
</template>

<script>
import RepeatingTransactionItem from "./RepeatingTransactionItem";
import ListComponent from "../ListComponent";
export default {
  name: "RepeatingTransactionsList",
  components: {ListComponent, RepeatingTransactionItem }
}
</script>

<style scoped>

</style>
