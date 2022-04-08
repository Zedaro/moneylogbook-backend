<template>
    <div>

        <div class="form-and-error-div">

            <error-login-signup :error="error">
                {{ errorMessage }}
            </error-login-signup>

            <v-card class="login-card">

                <validation-observer v-slot="{ handleSubmit }">
                    <v-form class="form" @submit.prevent="handleSubmit(login)">

                        <h1 class="form-title">{{ $t('authenticationForms.forgotPasswordLabel') }}</h1>

                        <validation-provider rules="required|email" v-slot="{ errors }">
                            <v-text-field
                                :label="$t('authenticationForms.email')"
                                type="email"
                                v-model="email"
                                :error-messages="errors"
                            ></v-text-field>
                        </validation-provider>

                        <div class="bottom-row-div">

                            <button type="submit" class="send-btn">{{ $t('authenticationForms.sendEmail') }}</button>

                            <div class="center-box flex flex-center-items space-evenly mr">
                                <a class="link" @click="goTo('login')">{{ $t('authenticationForms.loginLabel') }}</a>
                                <a class="link" @click="goTo('signup')">{{ $t('authenticationForms.signupLabel') }}</a>
                            </div>

                        </div>

                    </v-form>

                </validation-observer>

            </v-card>

        </div>

    </div>
</template>

<script>
import {ValidationObserver, ValidationProvider} from "vee-validate";
import '../validation/rules';
import ErrorLoginSignup from '../components/ErrorLoginSignup';

export default {
    name: "ForgotPasswort",
    components: { ValidationObserver, ValidationProvider, ErrorLoginSignup },
    data() {
        return {

            email: 'Bobsen24@Bob.com',
            password: 'testtesttest',

            error: false,
            errorKey: null,

        }
    },
    computed: {
        errorMessage() {
            if(this.errorKey === null)
                return '';
            else
                return this.$t(`errors.login.${this.errorKey}`);
        },
    },
    methods: {
        goTo(destination) {

            this.$router.push(`/auth/${destination}`);

        },
        login() {

            axios.get('/sanctum/csrf-cookie').then(response => {

                axios.post('/login', this.$data)
                    .then( (response) => {

                        location.reload();
                        /*window.location.href = '/overview';*/

                    })
                    .catch(error => {

                        //errors User ausgeben
                        //403 oder 422 -> falsche Daten
                        //Sonst: irgendwas anderes hat nicht geklappt

                        this.showError(error.response.status);
                        //this.showError(402);

                    });

            });

        },
        showError(status) {

            if(status === 422
                ||  status === 403
                ||  status === 401) {

                this.errorKey = 'wrongUserData';

            } else {

                this.errorKey = 'serverUnavailable';

            }

            this.error = true;

        },

    },

}
</script>

<style scoped>

    .test-background {
        background-color: #F5F5F5FF;
    }

    .center-box {
        margin: auto;
    }

    .flex {
        display: flex;
    }

    .space-evenly {
        justify-content: space-evenly;
    }

    .mrg-top-20 {
        margin-top: 20px;
    }




    .form-and-error-div {
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translateX(-50%);
    }

    .form-title {
        margin-bottom: 20px;
    }

    .bottom-row-div {
        margin-top: 20px;
    }

    .send-btn {
        min-width: 110px;
        min-height: 36px;
        height: fit-content;
        line-height: 1.5em;

        background-color: #f5f5f5;

        font-family: "Roboto", sans-serif;
        font-weight: 500;
        font-size: .875rem;

        border-color: transparent;
        border-radius: 4px;
        box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);

        text-transform: uppercase;
        letter-spacing: 0.08em;

        padding: 8px 16px;

        cursor: pointer;
    }

    @media screen and (min-width: 300px) {

        div .login-card{

            padding: 20px;
            margin-top: 20px;

        }

        .form-and-error-div {

            width: 95%;

        }

        .v-btn .v-btn__content {
            flex: 1 1 auto !important;
            white-space: normal !important;
            color: red !important;
        }

    }
    @media screen and (min-width: 600px) {

        .form-and-error-div {

            width: 70%;

        }

        div .login-card{

            padding: 20px;
            margin-top: 20px;

        }

        .signup-link {

            margin-left: 16px;

        }

    }
    @media screen and (min-width: 900px) {

        .form-and-error-div {

            width: 50%;

        }

        div .login-card{

            padding: 20px;
            margin-top: 20px;

        }

        .signup-link {

            margin-left: 16px;

        }

    }
</style>
