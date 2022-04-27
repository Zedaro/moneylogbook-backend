<template>
    <list-component>
        <transaction-item v-for="(transaction, index) in transactions" :key="index"
                          :name="transaction.name" :description="transaction.description" :money="transaction.money"
                          :moneyAccountId="transaction.moneyAccountId" :date="transaction.date" :index="index">
        </transaction-item>
    </list-component>
</template>

<script>
import {mapState} from'vuex';
import TransactionItem from "./TransactionItem";
import ListComponent from "../ListComponent";

export default {
    name: "TransactionsList",
    components: {ListComponent, TransactionItem},
    computed: {
        ...mapState({
            transactions: state => state.userData.transactions
        }),
    },
}
</script>

<style scoped>

</style>
