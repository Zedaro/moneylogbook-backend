<template>
  <div>
    <transfer-item v-for="(transfer, index) in this.$store.getters.getTransfers" :key="index"
                      :colorFrom="transfer.colorFrom" :colorTo="transfer.colorTo" :name="transfer.name" :description="transfer.description" :money="transfer.money" :from="transfer.from" :to="transfer.to" :date="transfer.date" :index="index">
    </transfer-item>
  </div>
</template>

<script>
import TransferItem from "./TransferItem";
export default {
  name: "TransfersList",
  components: { TransferItem }
}
</script>

<style scoped>

</style>
