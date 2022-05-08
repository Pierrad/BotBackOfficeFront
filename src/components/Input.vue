<script setup>
defineProps({
  modelValue: String,
  placeholder: String,
  childclass: String,
})
const emit = defineEmits(['update:modelValue'])


const updateInput = (event) => {
  emit("update:modelValue", event.target.value)
}

</script>

<template>
  <input :value="modelValue" :placeholder="placeholder" @input="updateInput" :class="childclass" />
</template>

<style scoped>
  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    outline: none;
  }
</style>