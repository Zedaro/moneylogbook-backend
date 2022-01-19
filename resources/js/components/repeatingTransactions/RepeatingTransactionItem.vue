<template>

    <v-card class="list-item" :to="moneyAccountsExist ? item : ''">
        <div class="color" :style="{ backgroundColor: this.color }"></div>
        <v-card-title class="card-title">{{ this.name }}</v-card-title>
        <v-card-text class="text-center grey--text">{{ this.description }}</v-card-text>
        <v-card-text class="text-center subtitle-1 money" :class="moneyColor">{{ $t('moneyFormat.format').format(this.money) }}</v-card-text>
        <v-card-text class="text-center grey--text">{{ this.moneyAccountName }}</v-card-text>
        <v-card-text class="text-center grey--text">{{ rhythmText }}</v-card-text>
        <v-card-text class="text-center grey--text">{{ formattedDate(startingDate) }} - {{ formattedDate(endingDate) }}</v-card-text>
    </v-card>

</template>


<script>
export default {
    name: "RepeatingTransactionItem",
    props: ['id', 'name', 'description', 'money', 'moneyAccountId', 'startingDate', 'endingDate', 'rhythmNumber', 'rhythmType', 'index'],
    computed: {
        moneyAccountsExist() {
            const account = this.$store.getters.getMoneyAccounts.find(account => account.id === this.moneyAccountId);

            //returns boolean
            return (typeof account != 'undefined');
        },
        item() {
            return {
                name: 'repeatingTransactionForm',
                params: {item: this.index}
            };
        },
        color() {
            return this.$store.getters.getColor(this.moneyAccountId);
        },
        moneyColor() {
            return ((this.money > 0) ? 'green--text' : 'red--text');
        },
        moneyAccountName() {
            return this.$store.getters.getMoneyAccountById(this.moneyAccountId).name;
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

.money {
    padding-bottom: 0;
}

</style>
