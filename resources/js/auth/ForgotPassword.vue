<template>
    <div>

        <div class="form-and-error-div">

            <message-card :messageType="messageType">
                {{ message }}
            </message-card>

<!--            <error-login-signup :error="error">
                {{ errorMessage }}
            </error-login-signup>-->

            <v-card class="forgot-password-form-card">

                <validation-observer v-slot="{ handleSubmit }">
                    <v-form class="form" @submit.prevent="handleSubmit(sendEmail)">

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

                            <div class="links-div">
                                <a class="login-link" @click="goTo('login')">{{ $t('authenticationForms.loginLabel') }}</a>
                                <a class="signup-link" @click="goTo('signup')">{{ $t('authenticationForms.signupLabel') }}</a>
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
import MessageCard from "../components/MessageCard";

export default {
    name: "ForgotPassword",
    components: { ValidationObserver, ValidationProvider, MessageCard },
    data() {
        return {

            email: 'Bobsen24@Bob.com',

            error: false,
            errorKey: null,

            messageType: null,

        }
    },
    computed: {
        errorMessage() {
            if(this.errorKey === null)
                return '';
            else if(this.errorKey === 'unregisteredEmail')
                return this.$t(`errors.forgotPassword.${this.errorKey}`);
            else
                return this.$t('errors.serverUnavailable');
        },
        message() {

            if(this.messageType === 'success')
                return this.$t('success.passwordResetEmailSent');
            else {
                if(this.errorKey === null)
                    return '';
                else if(this.errorKey === 'unregisteredEmail')
                    return this.$t(`errors.forgotPassword.${this.errorKey}`);
                else
                    return this.$t('errors.serverUnavailable');
            }

        }
    },
    methods: {
        goTo(destination) {

            this.$router.push(`/auth/${destination}`);

        },
        sendEmail() {

            axios.get('/sanctum/csrf-cookie').then(response => {

                axios.post('/forgot-password', { email: this.$data.email })
                    .then( () => {

                        this.messageType = 'success'
                        /*window.location.href = '/overview';*/

                    })
                    .catch(error => {

                        this.showError(error.response.status);

                    });

            });

        },
        showError(status) {

            if(status === 422
                ||  status === 403
                ||  status === 401) {

                this.errorKey = 'unregisteredEmail';

            } else {

                this.errorKey = 'serverUnavailable';

            }

            this.error = true;
            this.messageType = 'error';

        },
    },

}
</script>

<style scoped>

    div .forgot-password-form-card{
        padding: 20px;
        margin-top: 20px;
    }
    .form-and-error-div {
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translateX(-50%);
        width: 90%;
        margin-top: 10px;
    }
    .form-title {
        margin-bottom: 20px;
    }
    .bottom-row-div {
        margin-top: 20px;
    }
    .send-btn {
        display: block;

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

        margin: 0 auto;
        padding: 8px 16px;

        cursor: pointer;
    }
    .links-div {
        display: flex;
        justify-content: space-evenly;
        margin: 20px auto 0;
    }

    @media screen and (min-width: 450px) {

        .send-btn {
            display: inline-block;
            margin: 0;
        }

        .links-div {
            justify-content: start;
        }

        .login-link {
            margin-right: 12px;
        }

    }
    @media screen and (min-width: 600px) {

        .form-and-error-div {
            width: 70%;
        }

    }
    @media screen and (min-width: 900px) {

        .form-and-error-div {
            width: 50%;
        }

    }
</style>
