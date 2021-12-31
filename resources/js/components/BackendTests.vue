<template>
    <div>
        Hello World
        <v-btn @click="increment">Increment</v-btn>
        <div>
            {{ number }}
        </div>
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
