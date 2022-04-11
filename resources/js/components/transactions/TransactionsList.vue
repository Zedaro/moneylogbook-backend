<template>
    <div class="list-div">
        <transaction-item v-for="(transaction, index) in transactions" :key="index"
                          :name="transaction.name" :description="transaction.description" :money="transaction.money"
                          :moneyAccountId="transaction.moneyAccountId" :date="transaction.date" :index="index">
        </transaction-item>
    </div>
</template>

<script>
import {mapState} from'vuex';
import TransactionItem from "./TransactionItem";

export default {
    name: "TransactionsList",
    components: {TransactionItem},
    computed: {
        ...mapState({
            transactions: state => state.userData.transactions
        }),
    },
}
</script>

<style scoped>

</style>
