<template>

    <v-card class="error-card" v-if="errorMessage !== null">
        {{ $t(`errors.login.${errorMessage}`)}}
<!--        {{ $t(`errors.login.wrongUserData`)}}-->
    </v-card>

</template>

<script>
export default {
    name: "ErrorLoginSignup",
    props: ['error', 'errorMessage', ],
}
</script>

<style scoped>

    div .error-card {
        background-color: rgba(255, 0, 0, 0.5);
        width: 50%;
        margin: 0 auto;
        visibility: hidden;
    }

</style>
