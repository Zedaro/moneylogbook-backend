<template>
    <div class="textbox-root">
        <p :class="{ visible: visible, invisible: !visible }">Hello World!</p>
    </div>
</template>

<script>
export default {
    name: "TextBox",
    data() {
        return {
            visible: null,
        }
    },
    methods: {
        changeVisibility() {
            this.visible = !this.visible;
        }
    }
}
</script>

<style scoped>
    .textbox-root {
        border: solid black 1px;
    }

    .visible {
        visibility: visible;
    }

    .invisible {
        visibility: hidden;
    }
</style>
