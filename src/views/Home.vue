<script setup>
  import { ref } from 'vue'
  import { login } from '../services/User'
  import Input from '../components/Input.vue'
  import ActionButton from '../components/ActionButton.vue'

  const email = ref('')
  const password = ref('')

  const handleLogin = () => {
    login(email.value, password.value)
  }

</script>

<template>
  <main>
    <div class="container">
      <h1>Login</h1>
      <Input v-model="email" :placeholder="'Email...'" type="text" />
      <Input v-model="password" :placeholder="'Password...'" type="password" />
      <ActionButton @click="handleLogin">Login</ActionButton>
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

h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

input {
  max-width: 15rem;
  margin-bottom: 1rem;
}

button {
  max-width: 15rem;
  margin-bottom: 1rem;
}


</style>