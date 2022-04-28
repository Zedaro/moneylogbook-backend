<template>
  <list-component marginT>
    <transfer-item v-for="(transfer, index) in $store.getters.getTransfers" :key="index"
                   :id="transfer.id" :name="transfer.name" :description="transfer.description" :money="transfer.money" :fromId="transfer.fromId" :toId="transfer.toId" :date="transfer.date" :index="index">
    </transfer-item>
  </list-component>
</template>

<script>
import TransferItem from "./TransferItem";
import ListComponent from "../ListComponent";
export default {
  name: "TransfersList",
  components: {ListComponent, TransferItem }
}
</script>

<style scoped>

</style>
