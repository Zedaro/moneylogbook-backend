<template>
    <div>
        <v-btn v-blur @click="scrollToTop" class="back-to-top bottom-row-button" fixed right depressed fab>
            <v-icon>mdi-arrow-up</v-icon>
        </v-btn>
    </div>
</template>

<script>
export default {
    name: "BackToTopButton",
    methods: {
        scrollToTop(event) {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        },
    },
}
</script>

<style scoped>
    .back-to-top {
        visibility: hidden;
        top: 87.5%;
    }

    @media screen and (min-width: 700px) {
        .back-to-top {
            visibility: visible;
        }
    }
</style>
