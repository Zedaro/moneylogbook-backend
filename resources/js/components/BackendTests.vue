<template>
<!--    <div>-->
<!--        Hello World-->
<!--        <v-btn @click="increment">Increment</v-btn>-->
<!--        <div>-->
<!--            {{ number }}-->
<!--        </div>-->
<!--    </div>-->

    <div class="wrapper">
        <h2>Registrieren</h2>
        <p>Bitte geben Sie Ihre Nutzerdaten ein, um sich einzuloggen.</p>

        <!--Login-Form-->
        <form @submit.prevent="submit">
            <!--Benutzername-->
            <div class="form-group">
                <v-text-field label="Username"></v-text-field>
            </div>
            <!--Passwort-->
            <div class="form-group">
                <v-text-field type="password" label="Password"></v-text-field>
            </div>
            <!--Submit-->
            <div class="form-group">
                <v-btn>Submit</v-btn>
            </div>
            <!--Link zum Registrieren-->
<!--            <p>Sie haben noch keinen Account? <a href="signup.php">Registrieren Sie sich hier</a>.</p>-->
        </form>
    </div>


</template>

<script>
import axios from "axios";

export default {
    name: "BackendTests",
    data() {
        return {
          number: 0
        };
    },
    methods: {
        increment() {
            axios.get('/incrementNumber')
                .then ( function(response) {
                    console.log(response);
                })
        },
        submit() {



        }
    },
    beforeMount() {
        axios.get('/getMoneyAccounts')
            .then(function(response) {
                console.log(response.data);
            });

        // axios.post('/saveNewMoneyAccount', { name: "Edgar" })
        //     .then(function(response) {
        //         console.log(response);
        //     });

        // axios.post('/editMoneyAccount', { item: 3, name: "Edgar", money: 100, color: '0000FF' })
        //     .then(function(response) {
        //         console.log(response);
        //     });


    }
}
</script>

<style scoped>

    html {
        box-sizing: border-box;
        height: 100%;
    }

    *, *:before, *:after {
        box-sizing: inherit;
    }

    body {
        font: 14px sans-serif;
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
    }

    .wrapper {
        width: 360px;
        padding: 20px;
        border: solid 2px;
        box-shadow: 5px 10px;
        margin: 50px auto auto;
    }

</style>
