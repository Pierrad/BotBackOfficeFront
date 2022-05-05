<script setup>
  import { ref } from 'vue'
  import Input from '../components/Input.vue'


  const email = ref('')
  const password = ref('')

</script>

<template>
  <main>
    <div class="container">
      <h1>Login</h1>
      <Input v-model="email" :value="email" :placeholder="'Email...'" />
      <Input v-model="password" :value="password" :placeholder="'Password...'" />
    </div>
  </main>
</template>

<style scoped>

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}




</style>