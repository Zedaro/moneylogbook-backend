<template>

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

</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import '../../ValidationRules/validationRules';

export default {

    name: "LoginPage",
    components: { ValidationObserver, ValidationProvider },
    data() {
        return {

            //username: null,
            email: 'Bobsen24@Bob.com',
            password: 'testtesttest'

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
                        console.log("Error:", error);

                    });

            });

        }
    },

}
</script>

<style scoped>

.login-card{

    width: 50%;
    margin: auto;
    margin-top: 10%;
    padding: 20px;

}

.signup-link {

    margin-left: 16px;

}

</style>
