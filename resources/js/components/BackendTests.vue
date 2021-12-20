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

    }
}
</script>

<style scoped>

</style>
