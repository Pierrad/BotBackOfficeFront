<script setup>
import { onMounted, ref } from 'vue'
import Router from "../router/index"
import ActionButton from '../components/ActionButton.vue'
import Edit from '../components/icons/Edit.vue'
import Trash from '../components/icons/Trash.vue'
import Add from "../components/icons/Add.vue"
import { getBots } from '../services/Bot' 

let bots = ref([])

const fetchBots = async () => {
  bots.value = await getBots()
}

onMounted(() => {
  fetchBots()
})

const editBot = (bot) => {
  Router.push(`/bot/${bot._id}`)
}

</script>


<template>
  <div>
    <h1>Mes bots</h1>
    <div class="bots">
      <div v-for="bot in bots" class="bot" v-bind:key="bot._id">
        <h2>{{ bot.name }}</h2>
        <div class="actions">
          <ActionButton class="editButton" @click="editBot(bot)">
            <Edit />
          </ActionButton>
          <ActionButton class="deleteButton" @click="deleteBot(bot)">
            <Trash />
          </ActionButton>
        </div>
      </div>
    </div>
    <div class="addBox">
      <ActionButton @click="addBot" :childclass="'addButton'">
        <Add />
        Ajouter un bot
      </ActionButton>
    </div>
    
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 2rem;
}

.bots {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.bot {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}

.bot:last-child {
  border-bottom: 1px solid #ccc;
}

.actions {
  display: flex;
}

button {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0 1rem;
}

.editButton {
  background-color: #4842fe;
  margin-right: 0.5rem;
}

.deleteButton {
  background-color: #fc4848;
  margin-left: 0.5rem;
}

.addBox {
  display: flex;
  justify-content: flex-end;
}

.addButton {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0.5rem;
  background-color: #4842fe;
  width: max-content;
  color: white;
  border-radius: 0.2rem;
}


</style>

