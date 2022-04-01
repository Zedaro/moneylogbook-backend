<template>

    <v-card class="error-card" :class="{ visible: error }">
        <slot></slot>
<!--        {{ $t(`errors.login.wrongUserData`)}}-->
    </v-card>

</template>

<script>
export default {
    name: "ErrorLoginSignup",
    props: ['error', ],
}
</script>

<style scoped>

    div .error-card {
        background-color: rgba(255, 0, 0, 0.5);
        width: 100%;
        padding: 20px;
        margin: 0 auto;
        visibility: hidden;
    }

    .visible {
        visibility: visible !important;
    }

</style>
