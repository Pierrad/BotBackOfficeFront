<script setup>
import { onMounted, ref } from 'vue'
import Router from "../router/index"
import { getOneBot } from '../services/Bot' 

const id = window.location.pathname.split('/').pop()

if (!id) {
  Router.push('/')
}

let bot = ref({})

const fetchBot = async () => {
  bot.value = await getOneBot(id)
}

onMounted(() => {
  fetchBot()
})

</script>

<template>
  <div>
    <h1>Mon bot {{ bot.name }}</h1>
    <div class="entries">
      <div v-for="entry in bot.entries" class="entry" v-bind:key="entry._id">
        <p class="emoji">{{ entry.emoji }}</p>
        <div class="words">
          <div v-for="word in entry.words" class="word" v-bind:key="word._id">
            {{ word }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
h1 {
  margin-bottom: 2rem;
}


.entries:last-child {
  border-bottom: 1px solid #ccc;
}

.entry {
  display: flex;
  padding: 1rem;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  font-size: 2rem;
}

.emoji {
  margin-right: 2rem;
}

.words {
  display: flex;
}

.word:not(:last-child)::after {
  content: ',\00a0';
}

</style>
