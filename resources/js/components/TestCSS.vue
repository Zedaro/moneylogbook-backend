<template>
  <div>
    <div class="parent">
      <div class="child">
        bsjlbvdfhbhbhbhhbhbbsjlbvdfhbhbhbhhbhbbsjlbvdfhbhbhbhhbhbbsjlbvdfhbhbhbhhbhbbsjlbvdfhbhbhbhhbhbbsjlbvdfhbhbhbhhbhb
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TestCSS"
}
</script>

<style scoped>
  .parent {
    display: flex;
    border: 1px black solid;
    width: 500px;
    margin: auto;

  }

  .child {
    min-width: 0;
    word-wrap: break-word;
  }
</style>