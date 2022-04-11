<template>
  <div>
    <transfer-item v-for="(transfer, index) in $store.getters.getTransfers" :key="index"
                   :id="transfer.id" :name="transfer.name" :description="transfer.description" :money="transfer.money" :fromId="transfer.fromId" :toId="transfer.toId" :date="transfer.date" :index="index">
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
