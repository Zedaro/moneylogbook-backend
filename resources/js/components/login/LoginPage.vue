<template>

    <div>

        <div class="form-and-error-div">

            <error-login-signup :class="{ invisible: error }" :errorMessage="errorMessage"></error-login-signup>

            <v-card class="login-card">

                <validation-observer v-slot="{ handleSubmit }">
                    <v-form class="form" @submit.prevent="handleSubmit(login)">

                        <h1>{{ $t('authenticationForms.loginLabel') }}</h1>

                        <validation-provider rules="required">
                            <v-text-field
                                :label="$t('authenticationForms.email')"
                                type="email"
                                v-model="email"
                            ></v-text-field>
                        </validation-provider>

                        <validation-provider rules="required">
                            <v-text-field
                                :label="$t('authenticationForms.password')"
                                type="password"
                                v-model="password"
                            ></v-text-field>
                        </validation-provider>

                        <v-btn type="submit">{{ $t('authenticationForms.loginLabel') }}</v-btn>

                        <a href="/signup" class="signup-link">{{ $t('authenticationForms.signupLabel') }}</a>

                    </v-form>

                </validation-observer>

            </v-card>

        </div>

    </div>

</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import '../../ValidationRules/validationRules';
import ErrorLoginSignup from '../ErrorLoginSignup';

export default {

    name: "LoginPage",
    components: { ValidationObserver, ValidationProvider, ErrorLoginSignup },
    data() {
        return {

            //username: null,
            email: 'Bobsen24@Bob.com',
            password: 'testtesttest',
            error: true,
            errorMessage: null,

        }
    },
    methods: {
        login() {

            axios.get('/sanctum/csrf-cookie').then(response => {

                axios.post('/login', this.$data)
                    .then( (response) => {

                        console.log("Response:", response);

                        this.$router.go('/overview');
                        /*window.location.href = '/overview';*/

                    })
                    .catch(error => {

                        //errors User ausgeben
                        //403 oder 422 -> falsche Daten
                        //Sonst: irgendwas anderes hat nicht geklappt

                        this.showError(error.response.status);

                        console.log("Error:", error);

                    });

            });

        },
        showError(status) {

            if(status === 422
                ||  status === 403
                ||  status === 401) {

                this.errorMessage = 'wrongUserData';

            } else {

                this.errorMessage = 'serverUnavailable';

            }

            this.error = !this.error;

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

    div .error-card {

        width: 100%;
        padding: 20px;

    }

    .invisible {
        visibility: hidden;
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
