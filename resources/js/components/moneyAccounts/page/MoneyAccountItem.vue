<template>

    <v-card class="list-item" :to="item">
        <div class="color" :style="{ backgroundColor: color }"></div>
        <v-card-title id="card-title">{{ name }}</v-card-title>
        <v-card-text class="text-center subtitle-1 money">{{ $t('moneyFormat.format').format(money) }}</v-card-text>
        <v-card-text class="text-center grey--text">{{ percentage }}%</v-card-text>
    </v-card>

</template>



<script>
export default {
    name: "MoneyAccountItem",
    props: ['name', 'money', 'color', 'index'],
    computed: {
        item() {
            return {
                name: 'moneyAccountForm',
                params: { item: this.index }
            };
        },
        percentage() {
            const totalMoney = this.$store.getters.getTotalMoney;
            return ((this.money / totalMoney) * 100).toFixed(2);
        }
    }
}
</script>



<style scoped>

    .v-card {
        margin: auto;
        padding-left: 4% !important;
        padding-right: 4% !important;
    }

    .color {
        position: absolute;
        left: 0;
        width: 5%;
        height: 100%;
        background-color: pink;
    }

    .v-card__title {
        justify-content: center;
        word-break: break-word !important;
    }

    .money {
        padding-bottom: 0;
    }

</style>
