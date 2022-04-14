<template>
    <v-app id="inspire">
        <div class="user-app-div" v-if="authenticated == 'yes'">
            <user-app></user-app>
        </div>
        <authentication-page v-else-if="authPaths.includes($route.path)"></authentication-page>
<!--        <login-page v-else-if="this.$route.path == '/login'"></login-page>
        <sign-up v-else-if="this.$route.path == '/signup'"></sign-up>-->
    </v-app>
</template>

<script>
import LoginPage from "../auth/LoginComponent";
import SignUp from "../auth/SignupComponent";
import UserApp from "./UserApp";
import AuthenticationPage from "../auth/AuthenticationPage";

export default {
    name: 'App',
    components: {
        AuthenticationPage,
        UserApp,
        SignUp,
        LoginPage,
    },
    props: ['authenticated'],
    data() {
        return {

            authPaths: ['/auth/login', '/auth/signup', '/auth/forgotPassword', '/auth/resetPassword', `/auth/resetPassword/${this.$route.params['token']}`]

        }
    },
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
