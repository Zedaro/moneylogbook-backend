<template>

    <v-card class="list-item"
            :to="item"
            v-ripple="{ class: 'green-ripple' }">

<!--        color(moneyAccountId)-->

        <div class="color" :style="{ backgroundColor: $store.getters.color(moneyAccountId) }"></div>

        <v-card-text class="text-center grey--text date">{{ formattedDate }}</v-card-text>
        <!-- <v-card-text class="text-center grey--text description">{{ this.description }}</v-card-text> -->

        <div class="money-div">
            <v-card-text class="text-center money" :class="moneyColor">{{ $t('moneyFormat.format').format(money) }}</v-card-text>
        </div>

        <div class="money-account-div">
            <v-card-text class="text-center money-account">
                {{ moneyAccountName }}
            </v-card-text>
        </div>

        <div class="name-div">
            <v-card-text class="text-center grey--text name">{{ name }}</v-card-text>
        </div>

    </v-card>

</template>



<script>
import {mapGetters} from 'vuex';
export default {
    name: "TransactionItem",
    props: ['name', 'description', 'money', 'moneyAccountId', 'date', 'index'],
    computed: {
        ...mapGetters([
            'color',
            'getMoneyAccountById'
        ]),
        item() {
            return {
                name: 'transactionForm',
                params: { item: this.index }
            };
        },
        moneyColor() {
            return ( (this.money > 0) ? 'green--text' : 'red--text' );
        },
        formattedDate() {
            const [year, month, day] = this.date.split('-');
            return `${day}.${month}.${year}`;
        },
        moneyAccountName() {
            const account = this.getMoneyAccountById(this.moneyAccountId);
            let deleted = account.archived ? this.$t('archived.moneyAccount') : '';
            return account.name + deleted;
        }
    },
}
</script>



<style scoped>

    .v-card {
        /*
        display: grid;
        grid-template-columns: 50% 50%;
        grid-template-rows: 10% 40% 40%;
        */

        margin: auto;
    }


    .name-div{
        display: flex;
        justify-content: center;
        align-content: center;
        padding: 0 10% 5% 10%;
    }

    .name {
        font-size: 20px;
        min-width: 0;
        word-wrap: break-word;
        padding: 0;
    }

    .money-div{
        display: flex;
        justify-content: center;
        align-content: center;
        padding: 0 10% 5% 10%;
    }

    .money {
        font-size: 25px;
        padding: 0;
        min-width: 0;
        word-wrap: break-word;
    }

    .money-account-div{
        display: flex;
        justify-content: center;
        align-content: center;
        padding: 0 10% 5% 10%;
    }

    .money-account {
        font-size: 20px;
        padding: 0;
        min-width: 0;
        word-wrap: break-word;
    }

    .date {
        display: flex;
        justify-content: flex-end;
        align-content: center;
        padding-bottom: 2%;
    }

    .color {
        position: absolute;
        width: 5%;
        height: 100%;
        background-color: pink;
    }

    .v-card__title {
        justify-content: center;
    }

</style>
