<template>
  <v-app-bar app>
    <v-app-bar-nav-icon v-if="Object.keys($route.params).length === 0 && this.$route.params.item !== 'new'" @click="clickDrawer"></v-app-bar-nav-icon>   <!-- Object.keys($route.params).length === 0 -->
    <v-app-bar-nav-icon v-else @click="$router.back()">
      <v-icon>mdi-arrow-left</v-icon>
    </v-app-bar-nav-icon>
    <v-toolbar-title>{{ toolbarTitle }}</v-toolbar-title>

    <div class="buttons-div">

      <v-btn @click="test" class="test-btn my-auto" fab depressed>
        <v-icon>mdi-head-question-outline</v-icon>
      </v-btn>

      <v-btn class="newLocalStorageButton my-auto" @click="newLocalStorage" fab depressed>
        <v-icon>mdi-reload</v-icon>
      </v-btn>

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
              class="my-auto"
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

    </div>


  </v-app-bar>
</template>

<script>
export default {
  name: "TheHeader",
  data() {
    return {
      menu: false,
      selectedLangIndex: Object.keys(this.$store.state.localStorage.languages).findIndex(language => language === 'de'),
    }
  },
  computed: {
    toolbarTitle() {
      //Übersichts-Seiten
      if(this.$route.meta.title) {
        //return this.$t('headerTitle[this.$route.params.lang]');
        //return this.$route.meta.title;
        return this.$t('headerTitle')[this.$route.meta.title];
        //const titles = Object.keys(this.$t('headerTitle'));
        //return titles.find(title => title === this.$route.meta.title);
      }
      //Neuer Eintrag
      else if(this.$route.params.item === 'new') {

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
      return Object.values(this.$store.state.localStorage.languages);
    },
    languageAbbreviations() {
      return Object.keys(this.$store.state.localStorage.languages);
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
    test() {
      //console.log( parseFloat((10.05 + 10.05).toFixed(2)) );
      console.log(10.1 > 0);
    },
    newLocalStorage() {
      this.$store.dispatch('setLocalStorage', true);
    },
    deleteLocalStorage() {
      localStorage.removeItem('state');
    },
    changeLanguage() {
      this.$root.$i18n.locale = this.selectedLangAbbreviation;
    }
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

  .v-input {

  }

  .v-text-field {
    max-width: fit-content;
    height: 100%;
  }

  .v-input__slot {

  }

  .v-toolbar__title {
    width: fit-content;
    margin: 1px;
    overflow: visible;
  }

</style>