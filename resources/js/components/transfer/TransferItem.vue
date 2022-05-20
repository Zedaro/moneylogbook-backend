<template>

    <v-card class="list-item"
            :to="item"
            v-ripple="{ class: 'green-ripple' }">
        <div class="colorFrom" :style="{ backgroundColor: colorFrom }"></div>
        <div class="colorTo" :style="{ backgroundColor: colorTo }"></div>
        <v-card-text class="grey--text date">{{ formattedDate }}</v-card-text>
        <v-card-text class="text-center money">{{ $t('moneyFormat.format').format(money) }}</v-card-text>
        <div class="from-to-div">
            <v-card-text class="text-center money-account from">
                {{ moneyAccountName(fromId) }}
            </v-card-text>
            <v-icon class="arrow-down">mdi-arrow-down</v-icon>
            <v-card-text class="text-center money-account to">
                {{ moneyAccountName(toId) }}
            </v-card-text>
        </div>
        <v-card-text class="text-center grey--text name">{{ name }}</v-card-text>
    </v-card>

</template>



<script>
import {mapGetters} from "vuex";

export default {
    name: "TransferItem",
    props: ['name', 'description', 'money', 'fromId', 'toId', 'date', 'index'],
    computed: {
        ...mapGetters([
            'getMoneyAccountById',
        ]),
        item() {
            return {
                name: 'transferForm',
                params: { item: this.index }
            };
        },
        formattedDate() {
            const [year, month, day] = this.date.split('-');
            return `${day}.${month}.${year}`;
        },
        colorFrom() {
            return this.$store.getters.color(this.fromId);
        },
        colorTo() {
            return this.$store.getters.color(this.toId);
        },
        moneyAccountName() {
            return (id) => {

                const account = this.getMoneyAccountById(id);
                let deleted = account.archived ? this.$t('archived.moneyAccount') : '';
                return account.name + deleted;

            }
        }
    }
}
</script>



<style scoped>

    .v-card {
        margin: auto;
    }

    .list-item {

    }

    .date {
        display: flex;
        justify-content: flex-end;
        padding-right: 5%;
    }

    .money {
        font-size: 25px;
        padding-top: 0;
    }

    .name {
        font-size: 18px;
        min-width: 0;
        word-wrap: break-word;
        padding: 0 5% 15px;
    }

    .colorFrom {
        position: absolute;
        left: 0;
        width: 2.5%;
        height: 100%;
        /*background-color: pink;*/
    }

    .colorTo {
        position: absolute;
        /*left: 97.5%;*/
        right: 0;
        width: 2.5%;
        height: 100%;
        /*background-color: pink;*/
    }

    .v-card__title {
        justify-content: center;
    }

    .from-to-div {
        text-align: center;
        padding: 10px 0;
    }

    .money-account {
        font-size: 18px;
    }

    .from {
        padding-bottom: 0;
    }

    .to {
        padding-top: 0;
    }

    .arrow-down {

    }

    .money {
        padding-bottom: 0;
    }

</style>
