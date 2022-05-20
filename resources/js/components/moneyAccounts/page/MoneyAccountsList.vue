<template>
    <div>
        <v-card class="list-item ma-auto app-black-bg">
            <v-card-title class="justify-center app-green-text" id="card-title">{{ $t('totalText') }}</v-card-title>
            <v-card-text class="text-center app-green-text">{{ totalMoney }}</v-card-text>
        </v-card>
        <list-component>
            <money-account-item v-for="(account, index) in $store.getters.getUnarchivedMoneyAccounts" :key="index"
                                :name="account.name" :money="account.money" :color="account.color" :index="index" v-ripple="{ class: 'green-ripple' }">
            </money-account-item>
        </list-component>
    </div>
</template>

<script>
import MoneyAccountItem from "./MoneyAccountItem";
import ListComponent from "../../ListComponent";

export default {
    name: "MoneyAccountsList",
    components: {ListComponent, MoneyAccountItem},
    computed: {
        totalMoney() {
            let totalMoney = this.$store.getters.getTotalMoney;
            return this.$t('moneyFormat.format').format(totalMoney);
            //this.money.replace(/\./g, ',') €
        },

    }
}
</script>

<style scoped>

</style>
