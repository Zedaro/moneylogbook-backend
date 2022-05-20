<template>

    <v-card class="list-item"
            :to="(expired == false) ? item : ''"
            v-ripple="{ class: 'green-ripple' }">
        <div class="color" :style="{ backgroundColor: color }"></div>
        <v-card-text class="text-center grey--text flex date">{{ formattedDate(startingDate) }} - {{ formattedDate(endingDate) }}</v-card-text>
        <v-card-text class="text-center grey--text flex interval">{{ rhythmText }}</v-card-text>
        <v-card-text class="text-center money" :class="moneyColor">{{ $t('moneyFormat.format').format(money) }}</v-card-text>
        <v-card-text class="text-center money-account">{{ moneyAccountName }}</v-card-text>
        <v-card-title class="grey--text name">{{ name }}</v-card-title>
    </v-card>

</template>


<script>
import {mapGetters} from "vuex";

export default {
    name: "RepeatingTransactionItem",
    props: ['id', 'name', 'description', 'money', 'moneyAccountId', 'startingDate', 'endingDate', 'rhythmNumber', 'rhythmType', 'expired', 'index'],
    computed: {
        ...mapGetters([
            'getMoneyAccountById',
        ]),
        item() {
            return {
                name: 'repeatingTransactionForm',
                params: {item: this.index}
            };
        },
        color() {
            return this.$store.getters.color(this.moneyAccountId);
        },
        moneyColor() {
            return ((this.money > 0) ? 'green--text' : 'red--text');
        },
        moneyAccountName() {
            const account = this.getMoneyAccountById(this.moneyAccountId);
            let deleted = account.archived ? this.$t('archived.moneyAccount') : '';
            return account.name + deleted;
        },
        rhythmText() {
            return (this.$t('form.rhythmNumbers', {rhythmTypeIndex: this.rhythmType})[this.rhythmNumber] + " " + this.$t('form.rhythmTypes', {rhythmNumberIndex: this.rhythmNumber})[this.rhythmType]);
        },
        formattedDate() {
            return (date) => {
                if (date !== '') {
                    const [year, month, day] = date.split('-');
                    return `${day}.${month}.${year}`;
                } else {
                    return 'Kein Ende';
                }
            };
        },
        formattedStartingDate() {
            const [year, month, day] = this.startingDate.split('-');
            return `${day}.${month}.${year}`;
        },
        formattedEndingDate() {
            if (this.endingDate !== '') {
                const [year, month, day] = this.endingDate.split('-');
                return `${day}.${month}.${year}`;
            } else {
                return 'Kein Ende';
            }
        }
    }
}
</script>


<style scoped>

    .v-card {
        margin: auto;
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

    .flex {
        display: flex;
        justify-content: flex-end;
    }

    .date {
        padding-bottom: 5px;
    }

    .interval {
        padding-top: 0;
    }

    .money {
        font-size: 25px;
        padding-bottom: 10px;
    }

    .money-account{
        font-size: 18px;
    }

    .name {
        font-size: 18px;
        padding-top: 4px;
    }

</style>
