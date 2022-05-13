<template>

    <div class="form-and-error-div">

        <message-card :messageType="messageType">
            {{ message }}
        </message-card>

        <v-card class="sign-up-card">

            <validation-observer ref="form" v-slot="{ validate, handleSubmit }">
                <v-form class="form" @submit.prevent="handleSubmit(signUp)">

                    <h1 class="form-title">{{ $t('authenticationForms.signupLabel') }}</h1>

                    <validation-provider rules="required" v-slot="{ errors }">
                        <v-text-field
                            :label="$t('authenticationForms.name')"
                            type="text"
                            v-model="name"
                            :color="$store.state.formFocusColor"
                            :error-messages="errors"
                        ></v-text-field>
                    </validation-provider>

                    <validation-provider rules="required|email" v-slot="{ errors }">
                        <v-text-field
                            :label="$t('authenticationForms.email')"
                            type="email"
                            v-model="email"
                            :color="$store.state.formFocusColor"
                            :error-messages="errors"
                        ></v-text-field>
                    </validation-provider>

                    <validation-provider rules="required" vid="password" v-slot="{ errors }">
                        <v-text-field
                            :label="$t('authenticationForms.password')"
                            type="password"
                            v-model="password"
                            :color="$store.state.formFocusColor"
                            :error-messages="errors"
                        ></v-text-field>
                    </validation-provider>

                    <validation-provider rules="required|confirmed:password" v-slot="{ errors }">
                        <v-text-field
                            :label="$t('authenticationForms.confirmPassword')"
                            type="password"
                            v-model="password_confirmation"
                            :color="$store.state.formFocusColor"
                            :error-messages="errors"
                        ></v-text-field>
                    </validation-provider>

                    <div class="bottom-row-div">

                        <v-btn type="submit">{{ $t('authenticationForms.signupLabel') }}</v-btn>

                        <a class="login-link" @click="goToLogin">{{ $t('authenticationForms.loginLabel') }}</a>

                    </div>

                </v-form>

            </validation-observer>

        </v-card>

    </div>

</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import '../validation/rules';
import MessageCard from "../components/MessageCard";

export default {

    name: "SignupComponent",
    components: { ValidationObserver, ValidationProvider, MessageCard },
    data() {
        return {

            name: 'Bob Bobsen',
            email: 'Bobsen24@Bob.com',
            password: 'testtesttest',
            password_confirmation: 'testtesttest',

            error: false,
            errorKey: null,
            messageType: null,

        }
    },
    computed: {

        message() {

            if(this.errorKey === null)
                return '';
            else if(this.errorKey === 'userAlreadyExists')
                return this.$t(`errors.signup.${this.errorKey}`);
            else
                return this.$t('errors.serverUnavailable');

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

                    location.reload();

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
            this.messageType = 'error';

        },

    }

}
</script>

<style scoped>

    .form-and-error-div {
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 10px;
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
