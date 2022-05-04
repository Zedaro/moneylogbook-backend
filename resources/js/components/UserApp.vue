<template>
    <div v-if="!$store.state.loading">
        <navigation-drawer></navigation-drawer>
        <the-header></the-header>
        <v-main>
            <router-view/>
            <plus v-if="noForm"></plus>
            <back-to-top-button></back-to-top-button>
            <flash-message :position="'right bottom'"></flash-message>
        </v-main>
    </div>
</template>

<script>
import NavigationDrawer from "./NavigationDrawer";
import TheHeader from "./TheHeader";
import Plus from "./buttons/Plus";
import BackToTopButton from "./buttons/BackToTopButton";

export default {
    name: "UserApp",
    components: {
        NavigationDrawer,
        TheHeader,
        Plus,
        BackToTopButton,
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
    .form-card {
        margin-bottom: 50px !important;
    }

    @media screen and (orientation: landscape) {
        .bottom-row-button {
            top: 80% !important;
        }
    }
</style>
