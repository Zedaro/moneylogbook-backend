<template>
    <div class="f-container">
        <div class="f-item f-item1"></div>
        <div class="f-item f-item2"></div>
        <div class="f-item f-item3"></div>
    </div>
</template>

<script>
export default {
    name: "Playground"
}
</script>

<style scoped>

    .f-container {
        display: flex;
        justify-content: space-evenly;
        background-color: #e7e7e7;
        border: solid black 1px;
        min-height: 150px;
        width: 70%;
        margin: 50px auto 0;
        flex-wrap: wrap;
    }

    .f-item {
        background-color: #ffd6d6;
        border: solid black 1px;
        min-height: 50px;
        flex-grow: 1;
    }

    .f-item1 {
        width: 200px;
    }

    .f-item2 {
        width: 400px;
    }

    .f-item3 {
        width: 200px;
    }

</style>
