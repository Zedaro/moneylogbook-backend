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
export default {
    name: "AuthenticationPage",
    components: {},
    data() {
        return {

            menu: false,
            selectedLangIndex: Object.keys(this.$store.state.languages).findIndex(language => language === 'de'),

        }
    },
    computed: {
        languages() {
            return Object.values(this.$store.state.languages);
        },
        selectedLangText() {
            return this.languages[this.selectedLangIndex];
        },
        languageAbbreviations() {
            return Object.keys(this.$store.state.languages);
        },
        selectedLangAbbreviation() {
            return this.languageAbbreviations[this.selectedLangIndex];
        }
    },
    methods: {
        changeLanguage() {
            this.$root.$i18n.locale = this.selectedLangAbbreviation;
            //this.$refs.form.validate();
        },
    },
    watch: {
        selectedLangIndex() {
            this.changeLanguage();
        }
    }
}
</script>

<style scoped>

    div div.lang-menu {
        margin: 5px 5px 0 auto !important;
        width: 50px;
    }

</style>
