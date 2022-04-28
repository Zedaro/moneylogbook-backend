<template>

    <v-card class="message-card"
            :class="{   visible: messageType !== null,
                        error: messageType === 'error',
                        success: messageType === 'success' }">
        <slot></slot>
    </v-card>

</template>

<script>
export default {
    name: "MessageCard",
    props: ['messageType', ],
}
</script>

<style scoped>

div .message-card {
    width: 100%;
    padding: 20px;
    margin: 0 auto;
    visibility: hidden;
}

div .error {
    background-color: rgba(255, 0, 0, 0.5) !important;
}

div .success {
    background-color: #B1FF92CA !important;
}

.visible {
    visibility: visible !important;
}

/*.error-message {
    background-color: rgba(255, 0, 0, 0.5);
}*/

/*.success-message {
    background-color: rgba(176, 220, 45, 0.5);
}*/

</style>
