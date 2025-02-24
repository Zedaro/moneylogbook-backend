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
                    <v-btn @click="deleteData">{{ $t('form.permissionDialog.yes') }}</v-btn>
                    <v-btn @click="dialogDeletionPermission = false">{{ $t('form.permissionDialog.no') }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-card class="form-card">

            <validation-observer v-slot="{ handleSubmit }">
                <v-form ref="transactionForm" @submit.prevent="handleSubmit(saveData)">

                    <!-- name -->
                    <validation-provider rules="required|regex" v-slot="{ errors }">
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
                    <validation-provider rules="regex" v-slot="{ errors }">
                        <v-textarea
                            maxlength="1000"
                            auto-grow
                            rows="2"
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

                    <!-- moneyAccount -->
                    <validation-provider rules="required" v-slot="{ errors }">
                        <v-select
                            :items="selectItems"
                            :label="$t('form.moneyAccount')"
                            v-model="moneyAccountId"
                            :color="$store.state.formFocusColor"
                            :disabled="archived"
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
                                      :color="$store.state.formFocusColor"
                                      :disabled="archived"
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
                            :disabled="disabled || archived"
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
                                    :color="$store.state.formFocusColor"
                                    :error-messages="errors"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="startingDate"
                                no-title
                                scrollable
                                @input="menuStart = false"
                                first-day-of-week="1"
                                :locale="$i18n.locale"
                                :color="$store.state.formFocusColor"
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
                                :disabled="disabled || archived"
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
                                        :color="$store.state.formFocusColor"
                                        :error-messages="errors"
                                    ></v-text-field>
                                </template>
                                <v-list>
                                    <v-list-item-group v-model="rhythmNumberIndex" mandatory>
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
                                :disabled="disabled || archived"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        class="rhythm-type"
                                        :value="rhythmTypes[rhythmTypeIndex]"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        :disabled="disabled"
                                        :color="$store.state.formFocusColor"
                                        :error-messages="errors"
                                    ></v-text-field>
                                </template>
                                <v-list>
                                    <v-list-item-group v-model="rhythmTypeIndex" mandatory>
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
                                active-class="app-green-bg"
                                :disabled="archived"
                                :error-messages="errors"
                            >
                                <v-chip
                                    v-for="(day, index) in weekdays"
                                    :key="index"
                                    name="chipGroup"
                                    :disabled="disabled"
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
                                :color="$store.state.formFocusColor"
                                :disabled="archived"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="endingDate"
                            no-title
                            scrollable
                            @input="menuEnd = false"
                            first-day-of-week="1"
                            :color="$store.state.formFocusColor"
                        ></v-date-picker>
                    </v-menu>


                    <save-delete v-if="!archived" @deleteData="activatePermissionDialog"
                    ></save-delete>
                    <!-- <edit-money-account v-else></edit-money-account> -->

                </v-form>
            </validation-observer>

        </v-card>

    </div>
</template>

<script>
import SaveDelete from "../../buttons/SaveDelete";
import {ValidationObserver, ValidationProvider} from 'vee-validate';
import '../../../validation/rules';
import {mapGetters} from "vuex";

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
                menuRhythmType: false,

                dialogDeletionPermission: false,
                dialogText: '',
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
                menuRhythmType: false,

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
    computed: {
        ...mapGetters([
            'getMoneyAccountById',
        ]),
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
        },
        archived() {
            if(this.$route.params.item !== 'new')
                return Boolean( this.getMoneyAccountById(this.moneyAccountId).archived );
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
        nextOrThisWeekday(startingDate, selectedWeekdaysIndexes) {

            // let n = x+1;
            // if(x == 6) n = 0;
            //
            // var now = new Date();
            // now.setDate(now.getDate() + (n+(7-now.getDay())) % 7);
            //
            // return now.toISOString().substr(0, 10);


            //Heutiger Wochentag (z.B. Montag) als Zahl
            const d = new Date(startingDate);
            let startingDateWeekday = d.getDay();
            //Wenn $startingDateWeekday == 0, ist heute ein Sonntag -> setz startingDateWeekday auf 7 (damit ich damit arbeiten kann)
            if( startingDateWeekday == 0 ) startingDateWeekday = 7;
            //Make it an index
            startingDateWeekday = startingDateWeekday - 1;

            //Wenn der Wochentag des startingDates und einer der ausgewählten Wochentage übereinstimmen, dann returne das startingDate.
            if( selectedWeekdaysIndexes.includes(startingDateWeekday) ) return startingDate;




            //Gehe alle ausgewählten Wochentage durch.
            //Finde heraus, wie viele Tage zwischen dem Startdatumswochentag und dem nächsten ausgewählten Wochentag liegen. Mache dies für jeden ausgewählten Wochentag.

            const weekdayIndexes = [0, 1, 2, 3, 4, 5, 6];

            let wdIndex = (startingDateWeekday + 1 > 6) ? 0 : startingDateWeekday + 1;
            let distances = {};
            let daysUntilReached = 1;

            //debugger;

            for(let selectedWeekdayIndex of selectedWeekdaysIndexes) {

                //calculate distances
                while(wdIndex !== selectedWeekdayIndex) {

                    wdIndex = (wdIndex + 1 > 6) ? 0 : wdIndex + 1;
                    daysUntilReached++;

                }

                distances[selectedWeekdayIndex] = daysUntilReached;
                wdIndex = startingDateWeekday + 1;
                daysUntilReached = 1;

            }

            //debugger;

            let smallestDistance = Math.min(...Object.values(distances));

            //debugger;

            let nextWeekdayIndex = null;
            for(let [key, value] of Object.entries(distances)) {

                if( value === smallestDistance ) nextWeekdayIndex = key;

            }
            //let nextWeekdayIndex = distances.findKey(index => distances.index === smallestDistance);

            console.log("distances:", distances);
            console.log("smallestDistance:", smallestDistance);
            console.log("nextWeekdayIndex:", nextWeekdayIndex);

            //debugger;

            let n = nextWeekdayIndex+1;
            if(nextWeekdayIndex == 6) n = 0;

            var date = new Date(startingDate);
            date.setDate(date.getDate() + smallestDistance);

            return date.toISOString().substr(0, 10);

        },
        saveData() {
            // let rhythmNumbers = [];
            // for (let i = 0; i < 12; i++) {
            //     rhythmNumbers.push(i + 1);
            // }

            //When you pick "every friday" and 19.01.2022 as the startingDate, but this date is a monday, the starting date should rather be the date of the friday
            let startingDate = null;
            let orderedWeekdayIndexes = null;
            //If weekdays are selected -> calculate starting and ending date based on the selected weekdays
            if(this.weekdayIndexes?.length > 0) {

                //They are ordered because the user could select friday first and then monday, for example. Then the weekday indexes would be saved in this order.
                orderedWeekdayIndexes = this.weekdayIndexes.sort(function (a, b) {
                    return a - b
                });

                //Calculate the date of the earliest weekday that was selected ( [TUE, MON, FRI] -> date of next MON, or today if today is monday )
                //param: weekday index as used in this app, e.g. 0 => MON, 1 => TUE, ...
                this.startingDate = this.nextOrThisWeekday(this.startingDate, orderedWeekdayIndexes);

                //Now the ending date could be an earlier date than the starting date
                //if the user chose an endingDate
                if(this.endingDate !== '') {

                    //If endingDate < startingDate
                    if(this.endingDate < this.startingDate) {
                        this.endingDate = this.startingDate;
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
                weekdays: (this.rhythmTypeIndex === 0) ? orderedWeekdayIndexes : [], //(this.weekdayIndexes.length === 0) ? [] : orderedWeekdayIndexes,
                expired: false
            };

            //create new repTransaction
            if(this.$route.params.item === "new") {
                this.$store.dispatch('createRepeatingTransaction', repTransaction)
                    .then(() => {
                        this.flashMessage.setStrategy('multiple');
                        this.flashMessage.show({
                            status: 'success',
                            message: this.$t('flashMessage.success.saved.repeatingTransaction'),
                            time: 3000,
                            clickable: true
                        });

                        this.$router.push({name: 'repeatingTransactions'});
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
            }
            //edit repTransaction
            else {

                //Attach index to the repTransaction object
                repTransaction.index = this.$route.params.item;

                this.$store.dispatch('editRepeatingTransaction', repTransaction)
                    .then(() => {
                        this.flashMessage.setStrategy('multiple');
                        this.flashMessage.show({
                            status: 'success',
                            message: this.$t('flashMessage.success.saved.repeatingTransaction'),
                            time: 3000,
                            clickable: true,
                        });

                        this.$router.push({name: 'repeatingTransactions'});
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
            }

        },
        deleteData() {

            const id = this.id;
            const index = this.$route.params.item;

            this.$store.dispatch('deleteRepeatingTransaction', {id: id, index:index })
                .then(() => {
                    this.flashMessage.setStrategy('multiple');
                    this.flashMessage.show({
                        status: 'success',
                        message: this.$t('flashMessage.success.deleted.repeatingTransaction'),
                        time: 3000,
                        clickable: true,
                    });

                    this.$router.push({name: 'repeatingTransactions'});
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
