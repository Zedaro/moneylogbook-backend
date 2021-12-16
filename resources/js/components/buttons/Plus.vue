<template>

  <!-- :class="{ 'drawer-active': drawerState, 'drawer-inactive': !drawerState }" -->
  <div class="div" >
    <v-btn class="plus-button" fab dark medium color="green" :to="item">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
  </div>

</template>



<script>
  export default {
    name: "Plus",
    computed: {
      item() {
        if(this.$route.meta.title === 'moneyAccounts') {
          return {
            name: 'moneyAccountForm',
            params: { item: 'new' }
          };
        } else if(this.$route.meta.title === 'transactions') {
          return {
            name: 'transactionForm',
            params: { item: 'new' }
          };
        } else if(this.$route.meta.title === 'repeatingTransactions') {
          return {
            name: 'repeatingTransactionForm',
            params: { item: 'new' }
          };
        } else {
          return {
            name: 'transferForm',
            params: { item: 'new' }
          };
        }
      },
      drawerState() {
        return (this.$store.state.drawer);
      }
    }
}
</script>



<style scoped>

  .div {
    position: fixed;
    display: flex;
    justify-content: center;
    /*top: 83%;*/
    top: 87.5%;
    left: calc(50% - 28px);
    width: fit-content;
    height: fit-content;

    padding: 0;
    /*height: 150px;*/



    /*transition: width 0.25s;*/
  }

  .plus-button {
    margin: 0;
    padding: 0;
    align-self: center;
  }

  /*
  @media only screen and (min-width: 1264px) {
    .drawer-active {
      width: calc(100% - 256px);
    }

    .drawer-inactive {
      width: 100%;
    }
  }
  */



</style>