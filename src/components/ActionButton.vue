<script setup>

defineProps({
  onclick: Function,
  childclass: String,
})

</script>

<template>
  <button @click="onclick" :class="childclass">
    <slot>Button</slot>
  </button>
</template>


<style scoped>
  button {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 1rem;
    outline: none;
    cursor: pointer;
  }
</style>