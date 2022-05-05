<script setup>
defineProps({
  value: String,
  placeholder: String
})
const emit = defineEmits(['update:modelValue'])


const updateInput = (event) => {
  emit("update:modelValue", event.target.value)
}

</script>

<template>
  <input :value="value" :placeholder="placeholder" @input="updateInput" />
</template>

<style scoped>
  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 1rem;
    outline: none;
  }
</style>