<template>
    <v-app id="inspire">
        <div class="user-app-div" v-if="this.authenticated == 'yes'  &&  !this.$store.state.loading">
            <navigation-drawer></navigation-drawer>
            <the-header></the-header>
            <v-main>
                <router-view/>
                <plus v-if="noForm"></plus>
            </v-main>
        </div>
        <login-page v-else-if="this.$route.path == '/login'"></login-page>
        <sign-up v-else-if="this.$route.path == '/signup'"></sign-up>
    </v-app>
</template>

<script>
import NavigationDrawer from "./NavigationDrawer";
import TheHeader from "./TheHeader";
import Plus from "./buttons/Plus";
import LoginPage from "./login/LoginPage";
import SignUp from "./signup/SignUp";

export default {
    name: 'App',
    components: {
        SignUp,
        LoginPage,
        NavigationDrawer,
        TheHeader,
        Plus,
    },
    props: ['authenticated'],
    computed: {
        noForm() {
            return (this.$route.meta.formType) ? false : true;
        }
    }
}
</script>

<style>

body {
    padding-bottom: 200px;
}

.form-card {
    width: 90%;
    margin: 50px auto 0 auto;
    padding: 2%;
}

.list-item {
    width: 90%;
}



@media only screen and (min-width: 600px) {
    .form-card {
        width: 75%;
        margin: 50px auto 0 auto;
        padding: 2%;
    }

    .list-item {
        width: 75%;
    }
}

@media only screen and (min-width: 960px) {
    .form-card {
        width: 70%;
        margin: 50px auto 0 auto;
        padding: 2%;
    }

    .list-item {
        width: 70%;
    }
}

@media only screen and (min-width: 1264px) {
    .form-card {
        width: 50%;
        margin: 50px auto 0 auto;
        padding: 2%;
    }

    .list-item {
        width: 50%;
    }
}

@media only screen and (min-width: 1904px) {

}

</style>
