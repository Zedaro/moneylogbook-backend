<template>

<!--        <div class="user-app-div height-100" v-if="authenticated == 'yes'">
            <user-app></user-app>
        </div>-->
        <user-app v-if="authenticated == 'yes'"></user-app>
        <authentication-page v-else-if="authPaths.includes($route.path)"></authentication-page>
<!--        <login-page v-else-if="this.$route.path == '/login'"></login-page>
        <sign-up v-else-if="this.$route.path == '/signup'"></sign-up>-->

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

<style lang="less">

    //----------Darkmode?----------//

    .header-bg {
        .app-black-bg();
    }

    .header-text {
        .app-green-text();
    }

    .main-bg {
        .app-light-grey-bg();
    }

    .list-header-bg {
        .app-black-bg();
    }

    .list-header-text {
        .app-green-text();
    }

    .list-bg {

    }

    .list-text {

    }

    .button-bg {
        .app-black-bg();
    }

    .button-red-text {

    }

    .button-green-text {

    }

    //--------------------//

    .green-ripple {
        color: green !important;
    }

    .app-green-text {
        color: #b9ffb4eb !important;
    }

    .app-green-bg {
        background-color: #b9ffb4eb !important;
    }

    .app-red-text {
        color: #ff5858d1 !important;
    }

    .app-black-bg {
        background-color: #474747 !important;
    }

    .app-light-grey-bg {
        background-color: #f5f5f5 !important;
    }

    //--------------------//

    html, body {
        height: 100%;
    }

    .height-100 {
        height: 100%;
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
