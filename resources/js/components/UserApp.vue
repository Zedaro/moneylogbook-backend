<template>

    <v-app id="inspire" v-if="!$store.state.loading">
        <navigation-drawer></navigation-drawer>
        <the-header></the-header>
        <v-main class="main-bg">
            <router-view/>
            <plus v-if="noForm"></plus>
            <back-to-top-button v-if="noForm"></back-to-top-button>
            <flash-message :position="'right bottom'"></flash-message>
        </v-main>
    </v-app>

<!--    <div v-if="!$store.state.loading">
        <navigation-drawer></navigation-drawer>
        <the-header></the-header>
        <v-main class="main-bg">
            <router-view/>
            <plus v-if="noForm"></plus>
            <back-to-top-button v-if="noForm"></back-to-top-button>
            <flash-message :position="'right bottom'"></flash-message>
        </v-main>
    </div>-->
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

    },
}
</script>

<style scoped>
    main {
        min-height: 100%;
    }
</style>

<style>

    .form-card {
        margin-bottom: 100px !important;
    }

    @media screen and (orientation: landscape) {
        .bottom-row-button {
            top: 80% !important;
        }
    }

</style>
