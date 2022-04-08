<template>
    <div>

        <v-menu
            v-model="menu"
            :close-on-content-click="true"
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
                    class="my-auto lang-menu"
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

        <router-view></router-view>

    </div>
</template>

<script>
import { localeChanged } from 'vee-validate';
import axios from "axios";
export default {
    name: "AuthenticationPage",
    components: {},
    data() {
        return {

            menu: false,
            languages: Object.values(this.$store.state.languages),
            selectedLangIndex: null,

        }
    },
    computed: {
        selectedLangText() {
            return this.languages[this.selectedLangIndex];
        },
        languageKeys() {
            return Object.keys(this.$store.state.languages);
        },
        selectedLangKey() {
            return this.languageKeys[this.selectedLangIndex];
        }
    },
    methods: {
        changeLanguage() {
            axios.post('/changeLanguage', {lang: this.selectedLangKey}).then(() => {
                this.$i18n.locale = this.selectedLangKey;
                localeChanged();
                sessionStorage.setItem('locale', this.selectedLangKey);
            });
        },
    },
    watch: {
        selectedLangIndex() {
            this.changeLanguage();
        }
    },
    beforeMount() {
        console.log('sessionStorage:', sessionStorage.getItem('locale'));
        console.log('selectedLangIndex', this.selectedLangIndex);
        console.log(this.languages);

        this.$root.$i18n.locale = sessionStorage.getItem('locale') ? sessionStorage.getItem('locale') : navigator.language.substring(0, 2);
        localeChanged();
        this.selectedLangIndex = Object.keys(this.$store.state.languages).findIndex(language => language === this.$i18n.locale);
    },
}
</script>

<style scoped>

    div div.lang-menu {
        margin: 5px 5px 0 auto !important;
        width: 50px;
    }

</style>
