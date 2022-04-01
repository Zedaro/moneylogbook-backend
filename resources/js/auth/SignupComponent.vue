<template>

    <div class="form-and-error-div">

        <error-login-signup :error="error">
            {{ errorMessage }}
        </error-login-signup>

        <v-btn @click="test">Test</v-btn>

        <v-card class="sign-up-card">

            <validation-observer ref="form" v-slot="{ validate, handleSubmit }">
                <v-form class="form" @submit.prevent="handleSubmit(signUp)">

                    <h1 class="form-title">{{ $t('authenticationForms.signupLabel') }}</h1>

                    <validation-provider rules="required" v-slot="{ errors }">
                        <v-text-field
                            :label="$t('authenticationForms.name')"
                            type="text"
                            v-model="name"
                            :error-messages="errors"
                        ></v-text-field>
                    </validation-provider>

                    <validation-provider rules="required" v-slot="{ errors }">
                        <v-text-field
                            :label="$t('authenticationForms.email')"
                            type="email"
                            v-model="email"
                            :error-messages="errors"
                        ></v-text-field>
                    </validation-provider>

                    <validation-provider rules="required" vid="password" v-slot="{ errors }">
                        <v-text-field
                            :label="$t('authenticationForms.password')"
                            type="password"
                            v-model="password"
                            :error-messages="errors"
                        ></v-text-field>
                    </validation-provider>

                    <validation-provider rules="required|confirmed:password" v-slot="{ errors }">
                        <v-text-field
                            :label="$t('authenticationForms.confirmPassword')"
                            type="password"
                            v-model="password_confirmation"
                            :error-messages="errors"
                        ></v-text-field>
                    </validation-provider>

                    <div class="bottom-row-div">

                        <v-btn type="submit">{{ $t('authenticationForms.signupLabel') }}</v-btn>

                        <a class="login-link" @click="goToLogin">{{ $t('authenticationForms.loginLabel') }}</a>

                    </div>

                </v-form>

            </validation-observer>

            <v-btn @click="test">Change Validation Language</v-btn>

        </v-card>

    </div>

</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import '../validation/rules';
import ErrorLoginSignup from "../components/ErrorLoginSignup";
import { localeChanged } from "vee-validate";

export default {

    name: "SignupComponent",
    components: { ValidationObserver, ValidationProvider, ErrorLoginSignup },
    data() {
        return {

            name: 'Bob Bobsen',
            email: 'Bobsen24@Bob.de',
            password: 'testtesttest',
            password_confirmation: 'testtesttest',

            error: false,
            errorKey: null,

        }
    },
    computed: {

        errorMessage() {

            if(this.errorKey === null)
                return '';
            else
                return this.$t(`errors.signup.${this.errorKey}`);

        },

    },
    methods: {

        goToLogin() {

            this.$router.push('/auth/login');

        },
        async signUp() {

            console.log('hi');
            await axios.get('/sanctum/csrf-cookie');
            await axios.post('/register', this.$data)
                .then((response) => {

                    this.$router.go('/overview');

                })
                .catch((error) => {

                    this.showError(error.response.status);

                });

        },
        showError(status) {

            if( status === 422 ) {

                this.errorKey = 'userAlreadyExists';

            } else {

                this.errorKey = 'serverUnavailable';

            }

            this.error = true;

        },
        test() {
            /*this.$i18n.locale = 'en-US';
            localeChanged();*/
            if(this.errorKey === 'serverUnavailable')
                this.errorKey = 'userAlreadyExisting';
            else
                this.errorKey = 'serverUnavailable';
        }

    }

}
</script>

<style scoped>

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

    div .error-card {

        width: 100%;
        padding: 20px;

    }

    .visible {
        visibility: visible !important;
    }

    @media screen and (min-width: 300px) {

        div .sign-up-card{

            padding: 20px;
            margin-top: 20px;

        }

        .form-and-error-div {

            width: 95%;

        }

        .login-link {

            margin-left: 16px;

        }

    }
    @media screen and (min-width: 600px) {

        .form-and-error-div {

            width: 70%;

        }

        div .sign-up-card{

            padding: 20px;
            margin-top: 20px;

        }

        .login-link {

            margin-left: 16px;

        }

    }
    @media screen and (min-width: 900px) {

        .form-and-error-div {

            width: 50%;

        }

        div .sign-up-card{

            padding: 20px;
            margin-top: 20px;

        }

        .login-link {

            margin-left: 16px;

        }

    }

    /*.sign-up-card{

        width: 50%;
        margin: auto;
        margin-top: 10%;
        padding: 20px;

    }

    .login-link {

        margin-left: 16px;

    }*/

</style>
