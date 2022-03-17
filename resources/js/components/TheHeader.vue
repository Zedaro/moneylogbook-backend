<template>
    <v-app-bar app>
        <v-app-bar-nav-icon v-if="Object.keys($route.params).length === 0 && this.$route.params.item !== 'new'"
                            @click="clickDrawer"></v-app-bar-nav-icon>
        <!-- Object.keys($route.params).length === 0 -->
        <v-app-bar-nav-icon v-else @click="$router.back()">
            <v-icon>mdi-arrow-left</v-icon>
        </v-app-bar-nav-icon>
        <v-toolbar-title class="header-title">{{ toolbarTitle }}</v-toolbar-title>

        <div class="buttons-div">

            <v-btn @click="flash">Flash</v-btn>

<!--            <v-btn @click="test" class="test-btn my-auto" fab depressed>
                <v-icon>mdi-head-question-outline</v-icon>
            </v-btn>-->

<!--            <v-btn class="newLocalStorageButton my-auto" @click="refreshDB" fab depressed>
                <v-icon>mdi-reload</v-icon>
            </v-btn>-->

            <v-text-field
                v-model="selectedLangText"
                readonly
                outlined
                class="lang"
            ></v-text-field>

            <v-menu
                v-model="menu"
                :close-on-content-click="true"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="selectedLangText"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        outlined
                        class="my-auto lang"
                    ></v-text-field>
                </template>
                <v-list>
                    <v-list-item-group
                        v-model="selectedLangIndex"
                        mandatory
                    >
                        <v-list-item
                            v-for="(language, index) in languages"
                            :key="index"
                        >
                            <v-list-item-title>{{ language }}</v-list-item-title>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-menu>

            <v-btn @click="logout" class="logout">{{ this.$t('logout') }}</v-btn>

        </div>


    </v-app-bar>
</template>

<script>
export default {
    name: "TheHeader",
    data() {
        return {
            menu: false,
            selectedLangIndex: Object.keys(this.$store.state.userData.languages).findIndex(language => language === 'de'),
        }
    },
    computed: {
        toolbarTitle() {
            //Übersichts-Seiten
            if (this.$route.meta.title) {
                //return this.$t('headerTitle[this.$route.params.lang]');
                //return this.$route.meta.title;
                return this.$t('headerTitle')[this.$route.meta.title];
                //const titles = Object.keys(this.$t('headerTitle'));
                //return titles.find(title => title === this.$route.meta.title);
            }
            //Neuer Eintrag
            else if (this.$route.params.item === 'new') {

                return this.$t('headerTitle.new')[this.$route.meta.formType];
                /*
                if(this.$route.meta.formType === this.$t('formType.moneyAccount')) {
                  return this.$t('headerTitle.new.moneyAccount');
                } else if(this.$route.meta.formType === this.$t('formType.transaction')) {
                  return this.$t('headerTitle.new.transaction');
                } else if(this.$route.meta.formType === this.$t('formType.repeatingTransaction')) {
                  return this.$t('headerTitle.new.repeatingTransaction');
                } else {
                  return this.$t('headerTitle.new.transfer');
                }
                */
            }
            //Eintrag bearbeiten
            else {

                return this.$t('headerTitle.edit')[this.$route.meta.formType];

                /*
                if(this.$route.meta.formType === this.$t('formType.moneyAccount')) {
                  return this.$t('headerTitle.edit.moneyAccount');
                } else if(this.$route.meta.formType === this.$t('formType.transaction')) {
                  return this.$t('headerTitle.edit.transaction');
                } else if(this.$route.meta.formType === this.$t('formType.repeatingTransaction')) {
                  return this.$t('headerTitle.edit.repeatingTransaction');
                } else {
                  return this.$t('headerTitle.edit.transfer');
                }
                */
            }
        },
        languages() {
            return Object.values(this.$store.state.userData.languages);
        },
        languageAbbreviations() {
            return Object.keys(this.$store.state.userData.languages);
        },
        selectedLangText() {
            return this.languages[this.selectedLangIndex];
        },
        selectedLangAbbreviation() {
            return this.languageAbbreviations[this.selectedLangIndex];
        }
    },
    methods: {
        clickDrawer() {
            this.$store.dispatch("setDrawer");
        },
        testFunc(property) {

            const obj = {
                prop1: 'value1',
                prop2: 'value2'
            };

            return obj[property];

        },
        test() {
            //console.log( parseFloat((10.05 + 10.05).toFixed(2)) );
            //console.log(10.1 > 0);


            //console.log('Test result:', this.testFunc('prop1'));


            // let fruits = ['apple', 'banana', 'mango'];
            // console.table(fruits);


            axios.get("/test")
                .then((response) => {
                    //console.log("date < today:", response.data);
                    //console.log("php today():", response.data);
                    //console.log("strtotime:", response.data);
                    console.log("Test:", response.data);
                });


            // //Heutiger Wochentag (z.B. Montag) als Zahl
            // const d = new Date('2021-08-19');
            // let wday = d.getDay();
            // //Wenn $wday == 0, ist heute ein Sonntag -> setz wday auf 7 (damit ich damit arbeiten kann)
            // if( wday == 0 ) wday = 7;
            //
            // console.log(wday);


            // let obj = {
            //
            //   apple: 'apple',
            //   banana: 'banana',
            //   three: 'three',
            //   four: 'four',
            //   five: 'five'
            //
            // };
            //
            // let a = 1;
            // let b = 5;
            //
            // obj[a] = 'hello';
            // obj[b] = 'world';
            //
            // console.log(obj[5]);


            // let arr = [1, 2, 3];
            // arr.foo = 't';
            //
            // console.log(arr);
            // console.log(arr['foo']);


            // console.log(this.nextOrThisWeekday('2021-08-16', [6, 3]));

            // const startingDate = '2021-08-16';
            // const endingDate = '2021-08-16';
            // console.log(startingDate < endingDate);

        },
        flash() {
            /*console.log('Hi');*/
            this.flash({message: 'Hello there!', variant: 'success'});
            /*this.$router.push('/overview');*/
        },
        refreshDB() {
            this.$store.dispatch('refreshDB');
        },
        deleteLocalStorage() {
            localStorage.removeItem('state');
        },
        changeLanguage() {
            this.$root.$i18n.locale = this.selectedLangAbbreviation;
        },
        nextOrThisWeekday(startingDate, selectedWeekdaysIndexes) {

            // let n = x+1;
            // if(x == 6) n = 0;
            //
            // var now = new Date();
            // now.setDate(now.getDate() + (n+(7-now.getDay())) % 7);
            //
            // return now.toISOString().substr(0, 10);


            // let testD = new Date('2021-08-31');
            //
            // testD.setDate(36);
            // console.log(testD);
            //
            // return ;



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
            //Finde heraus, wie viele Tage Startdatumswochentag und dem nächsten ausgewählten Wochentag besteht. Mache dies für jeden ausgewählten Wochentag.

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
        logout() {
            axios.post('/logout');
        },
    },
    watch: {
        selectedLangIndex() {
            //console.log(this.$i18n.locale);
            this.changeLanguage();
            //console.log(this.$i18n.locale);
            //console.log(this.$t('headerTitle.moneyAccounts'));
            //console.log(this.$route.meta.title);
            //this.changeLanguage();
        }
    }
}
</script>

<style scoped>

    .newLocalStorageButton {
        /*border: solid black 1px;*/
    }

    .test-btn {

    }


    .buttons-div {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: flex-end;
    }

    @media screen and (max-width: 525px) {
        .header-title {
            padding-left: 0 !important;
        }
    }

    .v-input {

    }

    .v-text-field {
        max-width: 50px;
        height: 100%;
    }

    .lang {

    }

    .v-input .v-input__control .v-input__input {
        min-height: 40px !important;
        height: 40px;
    }

    .v-toolbar__title {
        width: fit-content;
        margin: 1px;
        overflow: visible;
    }

    .logout {
        align-self: center;
        margin-left: 15px;
    }

</style>
