<template>
    <div>

        <v-dialog v-model="dialogDeletionPermission" content-class="dialog">
            <v-card class="dialog-card">
                <v-card-title>
                    {{ $t('form.permissionDialog.delete') }}
                </v-card-title>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="archiveData">{{ $t('form.permissionDialog.yes') }}</v-btn>
                    <v-btn @click="dialogDeletionPermission = false">{{ $t('form.permissionDialog.no') }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

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
                                      :color="$store.state.formFocusColor"
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
                                      :color="$store.state.formFocusColor"
                        ></v-text-field>
                    </validation-provider>

                    <!-- color -->
                    <validation-provider rules="required" v-slot="{ errors }">
                        <v-input-colorpicker v-model="color" :error-messages="errors"/>
                    </validation-provider>

                    <save-delete @deleteData="activatePermissionDialog"></save-delete>

                </v-form>
            </validation-observer>

        </v-card>

    </div>
</template>

<script>
import SaveDelete from "../../buttons/SaveDelete";
import InputColorPicker from 'vue-native-color-picker';
import {ValidationObserver, ValidationProvider} from 'vee-validate';
import '../../../validation/rules.js';

export default {
    name: "MoneyAccountForm",
    components: {SaveDelete, "v-input-colorpicker": InputColorPicker, ValidationObserver, ValidationProvider},
    data() {

        if (this.$route.params.item === 'new') {
            return {
                new: true,
                name: '',
                money: null,
                color: '#000000',

                dialogDeletionPermission: false,
                dialogText: '',
            };
        } else {
            return {
                new: false,
                name: (this.$store.getters.getUnarchivedMoneyAccounts[this.$route.params.item].name),
                money: (this.$store.getters.getUnarchivedMoneyAccounts[this.$route.params.item].money),
                color: (this.$store.getters.getUnarchivedMoneyAccounts[this.$route.params.item].color),

                dialogDeletionPermission: false,
                dialogText: '',
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
                .then(() => {
                    this.$store.dispatch('updateTotalMoney');
                })
                .then(() => {
                    //success flash message
                    this.flashMessage.setStrategy('multiple');
                    this.flashMessage.show({
                        status: 'success',
                        message: this.$t('flashMessage.success.saved.moneyAccount'),
                        time: 3000,
                        clickable: true
                    });

                    this.$router.push({name: 'overview'});
                })
                .catch(() => {
                    //error flash message
                    this.flashMessage.setStrategy('multiple');
                    this.flashMessage.show({
                        status: 'error',
                        message: this.$t('flashMessage.error'),
                        time: 3000,
                        clickable: true
                    });
                });
        },
        archiveData() {
            this.$store.dispatch('archiveMoneyAccount', {
                index: this.$route.params.item,
                id: this.$store.getters.getUnarchivedMoneyAccounts[this.$route.params.item].id
            })
                .then(() => {
                    this.$store.dispatch('updateTotalMoney');
                })
                .then(() => {
                    this.flashMessage.setStrategy('multiple');
                    this.flashMessage.show({
                        status: 'success',
                        message: this.$t('flashMessage.success.deleted.moneyAccount'),
                        time: 3000,
                        clickable: true
                    });
                    this.$router.push({name: 'overview'});
                })
                .catch(() => {
                    this.flashMessage.setStrategy('multiple');
                    this.flashMessage.show({
                        status: 'error',
                        message: this.$t('flashMessage.error'),
                        time: 3000,
                        clickable: true
                    });
                });
        },
        activatePermissionDialog() {
            this.dialogText = 'Wollen Sie den Eintrag wirklich löschen?';
            this.dialogDeletionPermission = true;
        },
    },
    mounted() {
        /*window.scrollTo(0, 0);*/
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
