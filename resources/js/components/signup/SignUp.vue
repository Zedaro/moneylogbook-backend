<template>

    <v-card class="sign-up-card">

        <validation-observer v-slot="{ handleSubmit }">
            <v-form class="form" @submit.prevent="handleSubmit(signUp)">

                <h1>Sign up</h1>

                <validation-provider rules="required">
                    <v-text-field
                        label="Username"
                        type="text"
                        v-model="username"
                    ></v-text-field>
                </validation-provider>

                <validation-provider rules="required">
                    <v-text-field
                        label="E-Mail"
                        type="email"
                        v-model="email"
                    ></v-text-field>
                </validation-provider>

                <validation-provider rules="required">
                    <v-text-field
                        label="Password"
                        type="password"
                        v-model="password"
                    ></v-text-field>
                </validation-provider>

                <validation-provider rules="required">
                    <v-text-field
                        label="Confirm password"
                        type="password"
                        v-model="password_confirmation"
                    ></v-text-field>
                </validation-provider>

                <v-btn>Sign up</v-btn>

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

            username: null,
            email: null,
            password: null,
            password_confirmation: null

        }
    },
    methods: {

        signUp() {

            let userData = {

                username: this.username,
                email: this.email,
                password: this.password,
                password_confirmation: this.password_confirmation

            }

            axios.post('/signup', userData);

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

</style>
