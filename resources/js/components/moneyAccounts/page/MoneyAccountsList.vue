<template>
  <list-component>
    <money-account-item v-for="(account, index) in $store.getters.getMoneyAccounts" :key="index"
                        :name="account.name" :money="account.money" :color="account.color" :index="index">
    </money-account-item>
  </list-component>
</template>

<script>
import MoneyAccountItem from "./MoneyAccountItem";
import ListComponent from "../../ListComponent";
export default {
  name: "MoneyAccountsList",
  components: {ListComponent, MoneyAccountItem }
}
</script>

<style scoped>

</style>
