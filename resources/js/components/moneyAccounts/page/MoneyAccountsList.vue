<template>
  <div>
    <money-account-item v-for="(account, index) in $store.getters.getMoneyAccounts" :key="index"
                        :name="account.name" :money="account.money" :color="account.color" :index="index">
    </money-account-item>
  </div>
</template>

<script>
import MoneyAccountItem from "./MoneyAccountItem";
export default {
  name: "MoneyAccountsList",
  components: { MoneyAccountItem }
}
</script>

<style scoped>

</style>
