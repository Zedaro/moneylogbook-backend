<template>
    <div class="list">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "ListComponent"
}
</script>

<style scoped>
    .list {
        margin-bottom: 200px;
    }
</style>
