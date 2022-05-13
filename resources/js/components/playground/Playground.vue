<template>

    <div>

        <div class="f-container">
            <div class="f-item f-item1"></div>
            <div class="f-item f-item2"></div>
            <div class="f-item f-item3"></div>
        </div>

        <!-- Function call with $refs.refName.functionName -->
        <text-box ref="textbox"></text-box>
        <button @click="$refs.textbox.changeVisibility()">Show text</button>

        <div class="test-div"></div>

    </div>

</template>

<script>
import TextBox from "./TextBox";
export default {
    name: "Playground",
    components: {TextBox}
}
</script>

<style scoped lang="less">
    @import "../../../css/less/button";

    .f-container {
        display: flex;
        justify-content: space-evenly;
        background-color: #e7e7e7;
        border: solid black 1px;
        min-height: 150px;
        width: 70%;
        margin: 50px auto 0;
        flex-wrap: wrap;
        .f-item {
            background-color: #ffd6d6;
            border: solid black 1px;
            min-height: 50px;
            flex-grow: 1;
            &:nth-child(1) {
                width: 200px;
            }
            &:nth-child(2) {
                width: 400px;
            }
            &:nth-child(3) {
                width: 200px;
            }
        }
    }

    button {
        .button();
        color: red;
    }

    .test-div {
        width: 100px;
        height: 100px;
        background-color: black;
    }

</style>
