<template>
    <div>
        <v-card class="form-card">

            <validation-observer v-slot="{ handleSubmit }">
                <v-form ref="transactionForm" @submit.prevent="handleSubmit(saveData)">

                    <!-- name -->
                    <validation-provider rules="required|regex" v-slot="{ errors }">
                        <v-text-field counter="100"
                                      :label="$t('form.name')"
                                      maxlength="100"
                                      v-model="name"
                                      :error-messages="errors"
                        ></v-text-field>
                    </validation-provider>

                    <!-- description -->
                    <validation-provider rules="regex" v-slot="{ errors }">
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

                    <!-- moneyAccount -->
                    <validation-provider rules="required" v-slot="{ errors }">
                        <v-select
                            :items="selectItems"
                            :label="$t('form.moneyAccount')"
                            v-model="moneyAccountId"
                            :error-messages="errors"
                        ></v-select>
                    </validation-provider>

                    <!-- money -->
                    <validation-provider rules="required|not_zero" v-slot="{ errors }">
                        <v-text-field type="number"
                                      :label="$t('form.money')"
                                      step="0.01"
                                      :prefix="$t('moneyFormat.monetaryUnit')"
                                      v-model.number="money"
                                      :error-messages="errors"
                        ></v-text-field>
                    </validation-provider>

                    <!-- first date -->
                    <validation-provider rules="required" v-slot="{ errors }">
                        <v-menu
                            v-model="menuStart"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                            :disabled="disabled"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="computedStartingDateFormatted"
                                    :label="$t('form.startingDate')"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    :disabled="disabled"
                                    :error-messages="errors"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="startingDate"
                                no-title
                                scrollable
                                @input="menuStart = false"

                                :disabled="disabled"
                            ></v-date-picker>
                        </v-menu>
                    </validation-provider>

                    <!-- Interval -->
                    <div class="rhythm-div">
                        <!-- rhythmNumber-->
                        <validation-provider rules="required" v-slot="{ errors }">
                            <v-menu
                                v-model="menuRhythmNumber"
                                :close-on-content-click="true"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                                :disabled="disabled"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        class="rhythm-number"
                                        :value="rhythmNumbers[rhythmNumberIndex]"
                                        :label="$t('form.interval')"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        :disabled="disabled"
                                        :error-messages="errors"
                                    ></v-text-field>
                                </template>
                                <v-list>
                                    <v-list-item-group v-model="rhythmNumberIndex">
                                        <v-list-item
                                            v-for="(item, index) in rhythmNumbers"
                                            :key="index"
                                        >
                                            <v-list-item-title>{{ item }}</v-list-item-title>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                                <!--
                                <v-select
                                    :items="rhythmNumbers"
                                    value="Monat"
                                    v-model="rhythmNumber"
                                    :rules="this.rhythmTypeRules"
                                ></v-select>
                                -->
                            </v-menu>
                        </validation-provider>

                        <!-- rhythmType -->
                        <validation-provider rules="required" v-slot="{ errors }">
                            <v-menu
                                v-model="menuRhythmType"
                                :close-on-content-click="true"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                                :disabled="disabled"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        class="rhythm-type"
                                        :value="rhythmTypes[rhythmTypeIndex]"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        :disabled="disabled"
                                        :error-messages="errors"
                                    ></v-text-field>
                                </template>
                                <v-list>
                                    <v-list-item-group v-model="rhythmTypeIndex">
                                        <v-list-item
                                            v-for="(item, index) in rhythmTypes"
                                            :key="index"
                                        >
                                            <v-list-item-title>{{ item }}</v-list-item-title>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                            </v-menu>
                        </validation-provider>

                        <!-- weekdays -->
                        <validation-provider v-if="rhythmTypeIndex === 0" rules="required"
                                             v-slot="{ errors, validated, invalid }">
                            <v-chip-group
                                v-model="weekdayIndexes"
                                :class="{ weekdays, 'no-weekdays': validated && invalid }"
                                multiple
                                active-class="primary--text"
                                :error-messages="errors"
                            >
                                <v-chip
                                    v-for="(day, index) in weekdays"
                                    :key="index"
                                    name="chipGroup"
                                >
                                    {{ day }}
                                </v-chip>
                            </v-chip-group>
                        </validation-provider>
                    </div>

                    <!-- last date -->
                    <v-menu
                        v-model="menuEnd"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="computedEndingDateFormatted"
                                :label="$t('form.endingDate')"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="endingDate"
                            no-title
                            scrollable
                            @input="menuEnd = false"

                        ></v-date-picker>
                    </v-menu>


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
import SaveDelete from "../../buttons/SaveDelete";
import {ValidationObserver, ValidationProvider} from 'vee-validate';
import '../../../ValidationRules/validationRules';

export default {
    name: "RepeatingTransactionForm",
    components: {SaveDelete, ValidationObserver, ValidationProvider},
    data() {

        const repTransaction = this.$store.getters.getRepeatingTransactions[this.$route.params.item];

        if (this.$route.params.item === 'new') {
            return {
                new: true,
                id: null,
                name: '',
                description: '',
                selectItems: (this.$store.getters.getMoneyAccountSelectionItems),
                moneyAccountId: null,
                money: null,
                //selected rhythmNumber (e.g. "Every 2") as an index
                rhythmNumberIndex: 0,
                //selected rhythmType (e.g. "months") as an index
                rhythmTypeIndex: 1,
                weekdayIndexes: [],

                startingDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                endingDate: '',

                menuStart: false,
                menuEnd: false,
                menuRhythmNumber: false,
                menuRhythmType: false
            };
        }
        else {
            /*
            const rhythmType = this.$store.getters.getRepeatingTransactions[this.$route.params.item].rhythmType;
            let rhythmTypeIndex = null;
            if(rhythmType === 'weekly') {
              rhythmTypeIndex = 0;
            } else if(rhythmType === 'monthly') {
              rhythmTypeIndex = 1;
            } else {
              rhythmTypeIndex = 2;
            }
            */
            return {
                new: false,
                id: repTransaction.id,
                name: repTransaction.name,
                description: repTransaction.description,
                selectItems: this.$store.getters.getMoneyAccountSelectionItems,
                moneyAccountId: repTransaction.moneyAccountId,
                money: repTransaction.money,
                startingDate: repTransaction.startingDate,
                endingDate: repTransaction.endingDate,

                //e.g. "Every 2"
                rhythmNumberIndex: repTransaction.rhythmNumber, //- 1),
                //e.g. "months"
                rhythmTypeIndex: repTransaction.rhythmType,
                weekdayIndexes: repTransaction.weekdays,

                menuStart: false,
                menuEnd: false,
                menuRhythmNumber: false,
                menuRhythmType: false
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
    computed: {
        /**
         * rhythmNumbers:
         * "Every", "Every 2", "Every 3", ... ; as in "Every month"
         * Uses this.rhythmTypeIndex (e.g. "month") to determine how the selection options should be written (z.B. Jeden Monat vs JedeS Jahr)
         * @return {Array}
         */
        rhythmNumbers() {
            return this.$t('form.rhythmNumbers', {rhythmTypeIndex: this.rhythmTypeIndex});
        },
        /**
         * rhythmTypes:
         * "week", "month", "year"; as in "Every 2 months"
         * Uses this.rhythmNumberIndex (e.g. "Every 2") to determine how the selection options should be written (z.B. Jeden Monat vs Alle 2 MonatE)
         * @return {Array}
         */
        rhythmTypes() {
            return this.$t('form.rhythmTypes', {rhythmNumberIndex: this.rhythmNumberIndex});
        },
        weekdays() {
            return this.$t('form.weekdays');
        },
        computedStartingDateFormatted() {
            return this.formatDate(this.startingDate);
        },
        computedEndingDateFormatted() {
            return (this.endingDate != '') ? this.formatDate(this.endingDate) : '';
        },
        disabled() {
            return (this.$route.params.item === 'new') ? false : true;
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
        /**
         * allowedStartingDates(v) & allowedEndingDates(v):
         * rule functions; used to limit the number of dates the user can pick; used in v-date-picker
         */
        allowedStartingDates(v) {
            const today = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
            const todayParts = today.split('-');

            const startingDateParts = v.split('-');

            return (startingDateParts[0] > todayParts[0] || (startingDateParts[0] == todayParts[0] && startingDateParts[1] > todayParts[1]) || (startingDateParts[0] == todayParts[0] && startingDateParts[1] == todayParts[1] && startingDateParts[2] >= todayParts[2]));
        },
        allowedEndingDates(v) {
            const today = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
            const todayParts = today.split('-');

            const startingDateParts = this.startingDate.split('-');
            const endingDateParts = v.split('-');

            const endingDateAfterOrOnThisDay = (endingDateParts[0] > todayParts[0] || (endingDateParts[0] == todayParts[0] && endingDateParts[1] > todayParts[1]) || (endingDateParts[0] == todayParts[0] && endingDateParts[1] == todayParts[1] && endingDateParts[2] >= todayParts[2]));

            const endingDateAfterOrOnStartingDate = (endingDateParts[0] > startingDateParts[0] || (endingDateParts[0] == startingDateParts[0] && endingDateParts[1] > startingDateParts[1]) || (endingDateParts[0] == startingDateParts[0] && endingDateParts[1] == startingDateParts[1] && endingDateParts[2] >= startingDateParts[2]))

            return (endingDateAfterOrOnThisDay && endingDateAfterOrOnStartingDate);
        },
        formatDate(date) {
            const [year, month, day] = date.split('-');
            return `${day}.${month}.${year}`;
        },
        nextOrThisWeekday(x) {

            let n = x+1;
            if(x == 6) n = 0;

            var now = new Date();
            now.setDate(now.getDate() + (n+(7-now.getDay())) % 7);

            return now.toISOString().substr(0, 10);

        },
        saveData() {
            // let rhythmNumbers = [];
            // for (let i = 0; i < 12; i++) {
            //     rhythmNumbers.push(i + 1);
            // }

            //They are ordered because the user could select friday first and then monday, for example. Then the weekday indexes would be saved in this order.
            let orderedWeekdayIndexes = this.weekdayIndexes.sort(function (a, b) {
                return a - b
            });

            //When you pick "every friday" and 19.01.2022 as the startingDate, but this date is a monday, the date should rather be the date of the friday
            let startingDate = null;
            //If weekdays are selected -> calculate starting and ending date based on the selectes weekdays
            if(this.weekdayIndexes.length > 0) {

                //Calculate the date of the earliest weekday that was selected ( [TUE, MON, FRI] -> date of next MON, or today if today is monday )
                //param: weekday index as used in this app, e.g. 0 => MON, 1 => TUE, ...
                startingDate = this.nextOrThisWeekday(orderedWeekdayIndexes[0]);

                //Now the ending date could be an earlier date than the starting date
                //if the user chose an endingDate
                if(this.endingDate !== '') {

                    //get the day of the starting and ending date (e.g. 2022-01-19 -> 19)
                    let startingDateDay = startingDate.substr(8, 10);
                    let endingDateDay = this.endingDate.substr(8, 10);

                    //get the month of the starting and ending date (e.g. 2022-01-19 -> 01)
                    let startingDateMonth = startingDate.substr(5, 7);
                    let endingDateMonth = this.endingDate.substr(5, 7);

                    //get the year of the starting and ending date (e.g. 2022-01-19 -> 2022)
                    let startingDateYear = startingDate.substr(0, 4);
                    let endingDateYear = this.endingDate.substr(0, 4);

                    //If endingDate now
                    if(endingDateDay < startingDateDay  ||  endingDateMonth < startingDateMonth  ||  endingDateYear < startingDateYear) {
                        this.endingDate = startingDate;
                    }

                }

            }

            const repTransaction = {
                id: null || this.id,
                name: this.name,
                description: this.description,
                moneyAccountId: this.moneyAccountId,
                money: parseFloat(this.money.toFixed(2)),   //.replace(/\./g, ','),
                startingDate: startingDate || this.startingDate,
                endingDate: this.endingDate,
                rhythmNumber: this.rhythmNumberIndex,
                rhythmType: this.rhythmTypeIndex,
                weekdays: (this.weekdayIndexes.length == 0) ? [] : orderedWeekdayIndexes,
            };

            //create new repTransaction
            if(this.$route.params.item === "new") {
                this.$store.dispatch('createRepeatingTransaction', repTransaction)
                    .then(() => {
                        this.$router.push({name: 'repeatingTransactions'});
                    });
            }
            //edit repTransaction
            else {

                //Attach index to the repTransaction object
                repTransaction.index = this.$route.params.item;

                this.$store.dispatch('editRepeatingTransaction', repTransaction)
                    .then(() => {
                        this.$router.push({name: 'repeatingTransactions'});
                    });
            }

        },
        deleteData() {

            const id = this.id;
            const index = this.$route.params.item;

            this.$store.dispatch('deleteRepeatingTransaction', {id: id, index:index })
                .then(() => {
                    this.$router.push({name: 'repeatingTransactions'});
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

.rhythm-div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.rhythm-number {
    margin-right: 2.5%;
}

.rhythm-type {
    margin-left: 2.5%;
}

.no-weekdays {
    background-color: RGBA(249, 96, 97, 0.79);
}

@media only screen and (min-width: 768px) {
    .rhythm-div {
        display: flex;
        flex-wrap: wrap;
    }

    .weekdays {

    }
}

</style>

<!--

<v-date-picker
    v-model="startingDate"
    no-title
    scrollable
    @input="menuStart = false"
    :allowed-dates="allowedStartingDates"
    :disabled="disabled"
></v-date-picker>

-->


<!--

<v-date-picker
    v-model="endingDate"
    no-title
    scrollable
    @input="menuEnd = false"
    :allowed-dates="allowedEndingDates"
></v-date-picker>

-->
