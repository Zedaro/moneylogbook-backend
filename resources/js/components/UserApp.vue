<template>
    <div v-if="!$store.state.loading">
        <navigation-drawer></navigation-drawer>
        <the-header></the-header>
        <v-main>
            <router-view/>
            <plus v-if="noForm"></plus>
            <flash-message :position="'right bottom'"></flash-message>
        </v-main>
    </div>
</template>

<script>
import NavigationDrawer from "./NavigationDrawer";
import TheHeader from "./TheHeader";
import Plus from "./buttons/Plus";

export default {
    name: "UserApp",
    components: {
        NavigationDrawer,
        TheHeader,
        Plus
    },
    computed: {
        noForm() {
            return (this.$route.meta.formType) ? false : true;
        }
    },
    async beforeMount() {

        await this.$store.dispatch('getUserData')
                    .then( () => console.log("store state:", this.$store.getters.getState));

    }
}
</script>

<style scoped>

</style>

<style>

</style>
