<template>

    <v-card class="success-card" :class="{ visible: success == 'true' }">
        <slot></slot>
    </v-card>

</template>

<script>
export default {
    name: "SuccessCard",
    props: ['success', ],
}
</script>

<style scoped>

div .success-card {
    background-color: rgba(191, 255, 0, 0.5);
    width: 100%;
    padding: 20px;
    margin: 0 auto;
    visibility: hidden;
}

.visible {
    visibility: visible !important;
}

</style>
