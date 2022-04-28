<template>
    <div class="list" :class="{ 'margin-t': marginT !== undefined }">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "ListComponent",
    props: ['marginT'],
}
</script>

<style scoped>
    .list {
        margin-bottom: 200px;
    }
    .margin-t {
        margin-top: 20px;
    }
</style>
