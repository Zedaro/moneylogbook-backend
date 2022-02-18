<template>

    <v-card class="sign-up-card">

        <validation-observer v-slot="{ handleSubmit }">
            <v-form class="form" @submit.prevent="handleSubmit(signUp)">

                <h1>{{ $t('authenticationForms.signupLabel') }}</h1>

                <validation-provider rules="required">
                    <v-text-field
                        :label="$t('authenticationForms.name')"
                        type="text"
                        v-model="name"
                    ></v-text-field>
                </validation-provider>

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

                <validation-provider rules="required">
                    <v-text-field
                        :label="$t('authenticationForms.confirmPassword')"
                        type="password"
                        v-model="password_confirmation"
                    ></v-text-field>
                </validation-provider>

                <v-btn type="submit">{{ $t('authenticationForms.signupLabel') }}</v-btn>

                <a href="/login" class="login-link">{{ $t('authenticationForms.loginLabel') }}</a>

            </v-form>

        </validation-observer>

    </v-card>

</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import '../../ValidationRules/validationRules';

export default {

    name: "SignUp",
    components: { ValidationObserver, ValidationProvider },
    data() {
        return {

            name: 'Bob Bobsen',
            email: 'Bobsen24@Bob.de',
            password: 'testtesttest',
            password_confirmation: 'testtesttest'

        }
    },
    methods: {

        async signUp() {

            console.log('hi');
            await axios.get('/sanctum/csrf-cookie');
            await axios.post('/register', this.$data);

        }

    }

}
</script>

<style scoped>

    .sign-up-card{

        width: 50%;
        margin: auto;
        margin-top: 10%;
        padding: 20px;

    }

    .login-link {

        margin-left: 16px;

    }

</style>
