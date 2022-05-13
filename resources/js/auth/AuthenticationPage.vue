<template>

    <v-app id="inspire">
        <div class="auth-div">

            <v-menu
                v-model="menu"
                :close-on-content-click="true"
                transition="scale-transition"
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

            <v-main>
                <router-view> class="grey-bg"</router-view>
            </v-main>

        </div>
    </v-app>

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

    .auth-div {
        min-height: 100vh;
        background-color: #f5f5f5;
    }

</style>
