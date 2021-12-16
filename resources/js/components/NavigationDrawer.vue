<template>
  <v-navigation-drawer
      :value="drawer"
      app
      temporary
  >
    <v-list>
      <v-list-item-group>

        <v-list-item v-for="(item, index) in this.drawerListItems" :key="index" :to="{name: item.pathName}" three-line @click="clickDrawer">
          <v-list-item-content>
            <v-list-item-title class="text-h6">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list-item-group>
    </v-list>

  </v-navigation-drawer>
</template>

<script>
export default {
  name: "NavigationDrawer",
  data() {
    return {
      drawerListItems: [
        {
          pathName: 'overview',
          title: 'Übersicht'
        },
        {
          pathName: 'transactions',
          title: 'Transaktionen'
        },
        {
          pathName: 'repeatingTransactions',
          title: 'Daueraufträge'
        },
        {
          pathName: 'transfers',
          title: 'Umbuchungen'
        }
          /*
        {
          pathName: 'moneyAccounts',
          title: 'Konten'
        },
        */
      ]
    };
  },
  computed: {
    drawer() {
      return this.$store.getters.getDrawer;
    },
    height() {
      return 50;
    }
  },
  methods: {
    clickDrawer() {
      //this.$store.dispatch("setDrawer");
      this.$store.dispatch("setDrawer");
    }
  },
  mounted() {
    console.log(this.$data);
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
  }

  a:visited {
    color: black;
  }

  a:hover {
    font-weight: bold;
  }
</style>