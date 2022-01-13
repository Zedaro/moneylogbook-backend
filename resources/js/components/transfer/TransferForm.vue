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

        <validation-test></validation-test>

        <v-card class="form-card">

            <validation-observer v-slot="{ handleSubmit }">
                <v-form ref="transferForm" @submit.prevent="handleSubmit(saveData)">

                    <!-- name -->
                    <validation-provider :rules="{required: true, regex: true}" v-slot="{ errors }">
                        <v-text-field counter="100"
                                      :label="$t('form.name')"
                                      maxlength="100"
                                      v-model="name"
                                      :error-messages="errors"
                        ></v-text-field>
                    </validation-provider>

                    <!-- description -->
                    <validation-provider :rules="{regex: true}" v-slot="{ errors }">
                        <v-textarea
                            maxlength="1000"
                            v-model="description"
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
                                    :error-messages="errors"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="date"
                                no-title
                                scrollable
                                @input="menu = false"
                            ></v-date-picker>
                        </v-menu>
                    </validation-provider>


                    <save-delete @saveData="saveData"
                                 @deleteData="deleteData"
                    ></save-delete>
                    <!-- <edit-money-account v-else></edit-money-account> -->

                </v-form>
            </validation-observer>

        </v-card>

        <button @click="test">Test</button>

    </div>
</template>

<script>
import ValidationTest from "../ValidationTest";
import SaveDelete from "../buttons/SaveDelete";
import {ValidationObserver, ValidationProvider} from 'vee-validate';
import '../../ValidationRules/validationRules';


export default {
    name: "TransferForm",
    components: {SaveDelete, ValidationObserver, ValidationProvider, ValidationTest},
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

        console.log("transfer:", transfer);

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
            dialogText: ''
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
            /*
              if(typeof this.money == 'string') {
                this.money = parseFloat(this.money);
              }
              */


            //Create transfer object. Will be used as an argument.
            const transfer = {
                id: null || this.id,
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
                            this.$router.push({name: 'transfers'});
                        }
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
                            this.$router.push({name: 'transfers'});
                        }
                    })

            }



        },
        deleteData() {
            const data = {
                item: this.$route.params.item,
                name: this.name,
                description: this.description,
                from: this.from,
                to: this.to,
                money: parseFloat(this.money.toFixed(2)),   //.replace(/\./g, ','),
                date: this.date,
                //color: this.color
            };

            this.$store.dispatch('deleteTransfer', data)
                .then(() => {
                    this.$router.push({name: 'transfers'});
                });
        }
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


