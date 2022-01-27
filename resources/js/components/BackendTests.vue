<template>
<!--    <div>-->
<!--        Hello World-->
<!--        <v-btn @click="increment">Increment</v-btn>-->
<!--        <div>-->
<!--            {{ number }}-->
<!--        </div>-->
<!--    </div>-->

    <div class="wrapper">
        <h2>Login</h2>
        <p>Bitte geben Sie Ihre Nutzerdaten ein, um sich einzuloggen.</p>

        <!--Login-Form-->
        <form method="post">
        <!--Benutzername-->
        <div class="form-group">
            <label>Benutzername</label>
            <input type="text" name="username" class="form-control">
            <span class="invalid-feedback"><?php echo $username_err; ?></span>
        </div>
        <!--Passwort-->
        <div class="form-group">
            <label>Passwort</label>
            <input type="password" name="password" class="form-control">
            <span class="invalid-feedback"><?php echo $password_err; ?></span>
        </div>
        <!--Submit-->
        <div class="form-group">
            <input type="submit" class="btn btn-primary" value="Login">
        </div>
        <!--Link zum Registrieren-->
        <p>Sie haben noch keinen Account? <a href="signup.php">Registrieren Sie sich hier</a>.</p>
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

</style>
