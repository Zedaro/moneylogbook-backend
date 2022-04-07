<template>

    <div>

        <div class="form-and-error-div">

            <error-login-signup :error="error">
                {{ errorMessage }}
            </error-login-signup>

            <v-card class="login-card">

                <validation-observer v-slot="{ handleSubmit }">
                    <v-form class="form" @submit.prevent="handleSubmit(login)">

                        <h1 class="form-title">{{ $t('authenticationForms.loginLabel') }}</h1>

                        <validation-provider rules="required|email" v-slot="{ errors }">
                            <v-text-field
                                :label="$t('authenticationForms.email')"
                                type="email"
                                v-model="email"
                                :error-messages="errors"
                            ></v-text-field>
                        </validation-provider>

                        <validation-provider rules="required" v-slot="{ errors }">
                            <v-text-field
                                :label="$t('authenticationForms.password')"
                                type="password"
                                v-model="password"
                                :error-messages="errors"
                            ></v-text-field>
                        </validation-provider>

                        <div class="bottom-row-div">

                            <v-btn type="submit">{{ $t('authenticationForms.loginLabel') }}</v-btn>

                            <a class="signup-link" @click="goToSignup">{{ $t('authenticationForms.signupLabel') }}</a>

                        </div>

                    </v-form>

                </validation-observer>

            </v-card>

        </div>

    </div>

</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import '../validation/rules';
import ErrorLoginSignup from '../components/ErrorLoginSignup';

export default {

    name: "LoginComponent",
    components: { ValidationObserver, ValidationProvider, ErrorLoginSignup },
    data() {
        return {

            //username: null,
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
        goToSignup() {

            this.$router.push('/auth/signup');

        },
        login() {

            axios.get('/sanctum/csrf-cookie').then(response => {

                axios.post('/login', this.$data)
                    .then( (response) => {

                        console.log("Response:", response);

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

    @media screen and (min-width: 300px) {

        div .login-card{

            padding: 20px;
            margin-top: 20px;

        }

        .form-and-error-div {

            width: 95%;

        }

        .signup-link {

            margin-left: 16px;

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
