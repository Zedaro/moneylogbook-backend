<template>
  <div>
    <v-card class="form-card">

      <validation-observer v-slot="{ handleSubmit }">
        <v-form ref="moneyAccountForm" @submit.prevent="handleSubmit(saveData)">

          <!-- name -->
          <validation-provider rules="required|regex" v-slot="{ errors }">
            <v-text-field counter="100"
                        :label="$t('form.name')"
                        maxlength="100"
                        v-model="name"
                        :error-messages="errors"
          ></v-text-field>
          </validation-provider>

          <!-- money -->
          <validation-provider rules="required|double|zero_or_positive" v-slot="{ errors }">
            <v-text-field type="number"
                        :label="$t('form.balance')"
                        step="0.01"
                        :prefix="$t('moneyFormat.monetaryUnit')"
                        v-model.number="money"
                        :error-messages="errors"
          ></v-text-field>
          </validation-provider>

          <!-- color -->
          <validation-provider rules="required" v-slot="{ errors }">
            <v-input-colorpicker v-model="color" :error-messages="errors" />
          </validation-provider>

          <save-delete @deleteData="deleteData"></save-delete>

        </v-form>
      </validation-observer>

    </v-card>

    <button @click="test">Test</button>

  </div>
</template>

<script>
import SaveDelete from "../../buttons/SaveDelete";
import InputColorPicker from 'vue-native-color-picker';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import '../../../validation/rules';

export default {
  name: "MoneyAccountForm",
  components: { SaveDelete, "v-input-colorpicker": InputColorPicker, ValidationObserver, ValidationProvider },
  data() {

    // eslint-disable-next-line no-unused-vars
    const nameRules = [
        v => !!v || "Geben Sie bitte einen Namen an"
    ];
    // eslint-disable-next-line no-unused-vars
    const moneyRules = [
        v => !!v || "Geben Sie bitte einen Betrag an"
    ];


    if (this.$route.params.item === 'new') {
      return {
        new: true,
        name: '',
        money: null,
        color: '#000000',
        nameRules: nameRules,
        moneyRules: moneyRules
      };
    }
    else {
      return {
        new: false,
        name: (this.$store.getters.getMoneyAccounts[this.$route.params.item].name),
        money: (this.$store.getters.getMoneyAccounts[this.$route.params.item].money),
        color: (this.$store.getters.getMoneyAccounts[this.$route.params.item].color),
        nameRules: nameRules,
        moneyRules: moneyRules
      };
    }


    /*
    return {
      new: null,
      name: (this.$route.params.item == 'new' ? '' : this.$store.getters.getMoneyAccounts[this.$route.params.item].name),
      money: (this.$route.params.item == 'new' ? null : this.$store.getters.getMoneyAccounts[this.$route.params.item].money),
      color: (this.$route.params.item == 'new' ? '#000000' : this.$store.getters.getMoneyAccounts[this.$route.params.item].color),
      nameRules: nameRules,
      moneyRules: moneyRules
    };
    */

  },
  methods: {
    test() {
      /*
      console.log(this.$refs['moneyField']);
      console.log(this.name);
      console.log(this.money);
      console.log(this.color);
       */
    },
    saveData() {
      //console.log(this.accountData);
      /*
        if(typeof this.money == 'string') {
          this.money = parseFloat(this.money);
        }
        */

      const data = {
        item: this.$route.params.item,
        name: this.name,
        money: parseFloat(this.money.toFixed(2)),   //.replace(/\./g, ','),
        color: this.color
      };
      this.$store.dispatch('saveMoneyAccount', data)
          .then( () => {
            this.$store.dispatch('updateTotalMoney');
          })
          .then(() => {
            this.$router.push({name: 'overview'});
          });
    },
    deleteData() {
      this.$store.dispatch('deleteMoneyAccount', { index: this.$route.params.item, id: this.$store.getters.getMoneyAccountByIndex(this.$route.params.item).id })
          .then( () => {
            this.$store.dispatch('updateTotalMoney');
          })
          .then(() => {
            this.$router.push({name: 'overview'});
          });
    }
  },
  /*
  beforeMounted() {
    if(this.$route.params.item === 'new')
      this.$store.dispatch('setTitle', 'Neues Konto');
    else
      this.$store.dispatch('setTitle', 'Konto bearbeiten');
  }
   */
}
</script>



<style scoped>



</style>
