<template>
    <div>

        <v-dialog v-model="dialog" content-class="dialog">
            <v-card class="dialog-card">
                <v-card-title class="text-h5">
                    {{ $t('form.errorMessages.title') }}
                </v-card-title>
                <v-card-text>
                    {{ dialogText }}
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDeletionPermission" content-class="dialog">
            <v-card class="dialog-card">
                <v-card-title>
                    {{ $t('form.permissionDialog.delete') }}
                </v-card-title>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="deleteData">{{ $t('form.permissionDialog.yes') }}</v-btn>
                    <v-btn @click="dialogDeletionPermission = false">{{ $t('form.permissionDialog.no') }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-card class="form-card">

            <validation-observer v-slot="{ handleSubmit }">
                <v-form ref="transferForm" @submit.prevent="handleSubmit(saveData)">

                    <!-- name -->
                    <validation-provider :rules="{required: true, regex: true}" v-slot="{ errors }">
                        <v-text-field counter="100"
                                      :label="$t('form.name')"
                                      maxlength="100"
                                      v-model="name"
                                      :color="$store.state.formFocusColor"
                                      :disabled="archived"
                                      :error-messages="errors"
                        ></v-text-field>
                    </validation-provider>

                    <!-- description -->
                    <validation-provider :rules="{regex: true}" v-slot="{ errors }">
                        <v-textarea
                            maxlength="1000"
                            v-model="description"
                            :color="$store.state.formFocusColor"
                            :disabled="archived"
                            :error-messages="errors"
                        >
                            <template v-slot:label>
                                <div>
                                    {{ $t('form.description') }} <small>(optional)</small>
                                </div>
                            </template>
                        </v-textarea>
                    </validation-provider>

                    <!-- from -->
                    <validation-provider name="from" rules="required|twoDifferentMoneyAccounts:@to" v-slot="{ errors }">
                        <v-select
                            ref="from"
                            :items="selectItems"
                            :label="$t('form.from')"
                            v-model="fromId"
                            :color="$store.state.formFocusColor"
                            :disabled="archived"
                            :error-messages="errors"
                        ></v-select>
                    </validation-provider>

                    <!-- to -->
                    <validation-provider name="to" rules="required|twoDifferentMoneyAccounts:@from" v-slot="{ errors }">
                        <v-select
                            ref="to"
                            :items="selectItems"
                            :label="$t('form.to')"
                            v-model="toId"
                            :color="$store.state.formFocusColor"
                            :disabled="archived"
                            :error-messages="errors"
                        ></v-select>
                    </validation-provider>

                    <!-- money -->
                    <validation-provider rules="required|double|positiveFigure" v-slot="{ errors }">
                        <v-text-field type="number"
                                      :label="$t('form.money')"
                                      step="0.01"
                                      :prefix="$t('moneyFormat.monetaryUnit')"
                                      v-model.number="money"
                                      :color="$store.state.formFocusColor"
                                      :disabled="archived"
                                      :error-messages="errors"
                        ></v-text-field>
                    </validation-provider>

                    <!-- date -->
                    <validation-provider rules="required" v-slot="{ errors }">
                        <v-menu
                            v-model="menu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="computedDateFormatted"
                                    :label="$t('form.date')"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    :color="$store.state.formFocusColor"
                                    :disabled="archived"
                                    :error-messages="errors"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="date"
                                no-title
                                scrollable
                                @input="menu = false"
                                first-day-of-week="1"
                                :color="$store.state.formFocusColor"
                            ></v-date-picker>
                        </v-menu>
                    </validation-provider>


                    <save-delete v-if="!archived" @deleteData="activatePermissionDialog"
                    ></save-delete>
                    <!-- <edit-money-account v-else></edit-money-account> -->

                </v-form>
            </validation-observer>

        </v-card>

    </div>
</template>

<script>
import SaveDelete from "../buttons/SaveDelete";
import {ValidationObserver, ValidationProvider} from 'vee-validate';
import '../../validation/rules';
import {mapGetters} from "vuex";
export default {
    name: "TransferForm",
    components: {SaveDelete, ValidationObserver, ValidationProvider, },
    data() {
        /*
        const nameRules = [
          v => !!v || "Geben Sie bitte einen Namen an"
        ];
        const moneyRules = [
          v => !!v || "Geben Sie bitte einen Betrag an",
          v => v > 0 || "Geben Sie bitte einen positiven Betrag an"
        ];
        const fromRules = [
          (v) => {
            //return (console.log(this.to)) || 'Hello';
            if (v !== '' && this.to !== '') {
              //console.log(this.$refs.to.value);
              //(this.$refs.from.value !== this.$refs.to.value ? console.log('not equal') : console.log('equal'));
              return (v !== this.to) || "Bitte geben Sie zwei verschiedene Konten an";
            } else {
              return !!v || "Geben Sie bitte ein Konto an";
            }
          }
        ];
        const toRules = [
          (v) => {
            //return (console.log(this.to)) || 'Hello';
            if (v !== '' && this.from !== '') {
              //console.log(this.$refs.to.value);
              //(this.$refs.from.value !== this.$refs.to.value ? console.log('not equal') : console.log('equal'));
              return (v !== this.from) || "Bitte geben Sie zwei verschiedene Konten an";
            } else {
              return !!v || "Geben Sie bitte ein Konto an";
            }
          }
        ];
        */
        /*
        const selectRules = [
          (v) => {
              //return (console.log(this.to)) || 'Hello';
            if (this.to != '' && this.from != '') {
              //console.log(this.$refs.to.value);
              //(this.$refs.from.value !== this.$refs.to.value ? console.log('not equal') : console.log('equal'));
              return (this.from !== this.to) || "Bitte geben Sie zwei verschiedene Konten an";
            } else {
              return !!v || "Geben Sie bitte ein Konto an";
            }
          }
        ];
        */

        const newForm = this.$route.params.item === 'new';
        const transfer = this.$store.getters.getTransfers[this.$route.params.item];

        return {
            id: (newForm) ? ('') : (transfer.id),
            name: (newForm) ? ('') : (transfer.name),
            description: (newForm) ? ('') : (transfer.description),
            fromId: (newForm) ? ('') : (transfer.fromId),
            toId: (newForm) ? ('') : (transfer.toId),
            money: (newForm) ? (null) : (transfer.money),
            date: (newForm) ? (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10) : (transfer.date),
            selectItems: (this.$store.getters.getMoneyAccountSelectionItems),

            menu: false,
            dialog: false,
            dialogText: '',
            dialogDeletionPermission: false,
            /*
            name: '',
            description: '',
            items: (this.$store.getters.getMoneyAccountNames),
            from: '',
            to: '',
            money: null,
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            */

            //<editor-fold desc="Rules">
            /*
            nameRules: [
              v => !!v || "Geben Sie bitte einen Namen an"
            ],
            moneyRules: [
              v => !!v || "Geben Sie bitte einen Betrag an",
              v => v > 0 || "Geben Sie bitte einen positiven Betrag an"
            ],
            fromRules: [
              (v) => {
                //return (console.log(this.to)) || 'Hello';
                if (v !== '' && this.to !== '') {
                  //console.log(this.$refs.to.value);
                  //(this.$refs.from.value !== this.$refs.to.value ? console.log('not equal') : console.log('equal'));
                  return (v !== this.to) || "Bitte geben Sie zwei verschiedene Konten an";
                } else {
                  return !!v || "Geben Sie bitte ein Konto an";
                }
              }
            ],
            toRules: [
              (v) => {
                //return (console.log(this.to)) || 'Hello';
                if (v !== '' && this.from !== '') {
                  //console.log(this.$refs.to.value);
                  //(this.$refs.from.value !== this.$refs.to.value ? console.log('not equal') : console.log('equal'));
                  return (v !== this.from) || "Bitte geben Sie zwei verschiedene Konten an";
                } else {
                  return !!v || "Geben Sie bitte ein Konto an";
                }
              }
            ],
            */
            //</editor-fold>


        };


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
    computed: {
        ...mapGetters([
            'getMoneyAccountById'
        ]),
        /*
        name() {
          return (this.new) ? ('') : (this.transfers.name);
        },
        description() {
          return (this.new) ? ('') : (this.transfers.description);
        },
        from() {
          return (this.new) ? ('') : (this.transfers.from);
        },
        to() {
          return (this.new) ? ('') : (this.transfers.to);
        },
        money() {
          return (this.new) ? (null) : (this.transfers.money);
        },
        date() {
          return (this.new) ? (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10) : (this.transfers.date);
        },
        */
        /*
        formData() {
          if(this.new) {
            return {
              name: '',
              description: '',
              from: '',
              to: '',
              money: null,
              date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            };
          } else {
            return {
              name: (this.$store.getters.getTransfers[this.$route.params.item].name),
              description: (this.$store.getters.getTransfers[this.$route.params.item].description),
              from: (this.$store.getters.getTransfers[this.$route.params.item].from),
              to: (this.$store.getters.getTransfers[this.$route.params.item].to),
              money: (this.$store.getters.getTransfers[this.$route.params.item].money),
              date: (this.$store.getters.getTransfers[this.$route.params.item].date),
            };
          }
        },*/
        computedDateFormatted() {
            return this.formatDate(this.date);
        },
        archived() {
            if(this.$route.params.item !== 'new') {
                let fromAccountArchived = this.getMoneyAccountById(this.fromId).archived;
                let toAccountArchived = this.getMoneyAccountById(this.toId).archived;
                return Boolean(fromAccountArchived || toAccountArchived);
            }
        }
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
        formatDate(date) {
            const [year, month, day] = date.split('-');
            return `${day}.${month}.${year}`;
        },
        saveData() {

            //Create transfer object. Will be used as an argument.
            const transfer = {
                id: null || this.id,
                index: (this.$route.params.item === "new" ? null : this.$route.params.item),
                name: this.name,
                description: this.description,
                fromId: this.fromId,
                toId: this.toId,
                money: parseFloat(this.money.toFixed(2)),   //.replace(/\./g, ','),
                date: this.date
            };

            //Neue Umbuchung
            if (this.$route.params.item === "new") {

                this.$store.dispatch('createTransfer', transfer)
                    .then((dialogText) => {
                        //If dialogText is filled, there was an error. this.dialog is set to true. v-dialog gets activated (i.e. dialog window is shown).
                        if (dialogText !== undefined) {
                            this.dialogText = dialogText;
                            this.dialog = true;
                        }
                        //If everything worked, the user is directed to the transfers page
                        else {
                            this.flashMessage.setStrategy('multiple');
                            this.flashMessage.show({
                                status: 'success',
                                message: this.$t('flashMessage.success.saved.transfer'),
                                time: 3000,
                                clickable: true
                            });

                            this.$router.push({name: 'transfers'});
                        }
                    })
                    .catch(error => {
                        this.flashMessage.setStrategy('multiple');
                        this.flashMessage.show({
                            status: 'error',
                            message: this.$t('flashMessage.error'),
                            time: 3000,
                            clickable: true
                        });
                    })

            }

            //Umbuchung bearbeiten
            else {

                this.$store.dispatch('editTransfer', { transfer: transfer, transferIndex: this.$route.params.item })
                    .then((dialogText) => {
                        //If dialogText is filled, there was an error. this.dialog is set to true. v-dialog gets activated (i.e. dialog window is shown).
                        if (dialogText !== undefined) {
                            this.dialogText = dialogText;
                            this.dialog = true;
                        }
                        //If everything worked, the user is directed to the transfers page
                        else {
                            this.flashMessage.setStrategy('multiple');
                            this.flashMessage.show({
                                status: 'success',
                                message: this.$t('flashMessage.success.saved.transaction'),
                                time: 3000,
                                clickable: true
                            });

                            this.$router.push({name: 'transfers'});
                        }
                    })
                    .catch(error => {
                        this.flashMessage.setStrategy('multiple');
                        this.flashMessage.show({
                            status: 'error',
                            message: this.$t('flashMessage.error'),
                            time: 3000,
                            clickable: true
                        });
                    })

            }

        },
        deleteData() {
            const transferId = this.id;
            const transferIndex = this.$route.params.item;

            this.$store.dispatch('deleteTransfer', { transferId: transferId, transferIndex: transferIndex })
                .then(() => {
                    this.flashMessage.setStrategy('multiple');
                    this.flashMessage.show({
                        status: 'success',
                        message: this.$t('flashMessage.success.deleted.transaction'),
                        time: 3000,
                        clickable: true
                    });

                    this.$router.push({name: 'transfers'});
                })
                .catch(error => {
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
    }
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

.dialog-card {
    background-color: #ff879c;
}

</style>


<style>
.dialog {
    max-width: 85%;
}

@media only screen and (min-width: 600px) {
    .dialog {
        max-width: 60%;
    }
}

@media only screen and (min-width: 960px) {
    .dialog {
        max-width: 60%;
    }
}

@media only screen and (min-width: 1264px) {
    .dialog {
        max-width: 30%;
    }
}

@media only screen and (min-width: 1904px) {
    .dialog {
        max-width: 30%;
    }
}

</style>


