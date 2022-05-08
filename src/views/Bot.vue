<script setup>
import { onMounted, ref } from 'vue'
import Router from "../router/index"
import { getOneBot, editEntries } from '../services/Bot'
import ActionButton from "../components/ActionButton.vue"
import Input from "../components/Input.vue"
import VueTagsInput from "@sipec/vue3-tags-input"
import ArrowLeft from "../components/icons/ArrowLeft.vue"
import Edit from "../components/icons/Edit.vue"
import Add from "../components/icons/Add.vue"
import Modal from "../components/Modal.vue"

const id = window.location.pathname.split('/').pop()

if (!id) {
  Router.push('/')
}

const bot = ref({})
const isModalVisible = ref(false)
const emojiInModal = ref('')
const wordsInModal = ref([])
const tag = ref('')

const fetchBot = async () => {
  bot.value = await getOneBot(id)
}

const back = () => {
  Router.push('/dashboard')
}

const closeModal = () => {
  isModalVisible.value = false
}

const openModal = (entry) => {
  isModalVisible.value = true
  if (entry) {
    emojiInModal.value = entry.emoji
    wordsInModal.value = entry.words
  } else {
    emojiInModal.value = ''
    wordsInModal.value = []
  }
}

const editEntry = () => {
  bot.value.entries = bot.value.entries.map((entry,) => {
    if (entry.emoji === emojiInModal.value) {
      entry.words = JSON.parse(JSON.stringify(wordsInModal.value)).map(word => word.text) // odd way to access proxy refs
    }
    return entry
  })

  if (!bot.value.entries.find(entry => entry.emoji === emojiInModal.value)) {
    bot.value.entries.push({
      emoji: emojiInModal.value,
      words: JSON.parse(JSON.stringify(wordsInModal.value)).map(word => word.text)
    })
  }

  editEntries(id, JSON.parse(JSON.stringify(bot.value.entries)))
}

onMounted(() => {
  fetchBot()
})

</script>

<template>
  <div>
    <div class="title">
      <ActionButton @click="back" class="backButton">
        <ArrowLeft />
        Retour
      </ActionButton>
      <h1>Mon bot {{ bot.name }}</h1>
    </div>
    <div class="entries">
      <div v-for="entry in bot.entries" class="entry" v-bind:key="entry._id">
        <p class="emoji">{{ entry.emoji }}</p>
        <div class="words">
          <div v-for="word in entry.words" class="word" v-bind:key="word._id">
            {{ word }}
          </div>
        </div>
        <ActionButton @click="openModal(entry)" :childclass="'editWordsButton'">
          <Edit />
        </ActionButton>
      </div>
    </div>
    <div class="addBox">
      <ActionButton @click="openModal" :childclass="'addEntryButton'">
        <Add />
        Ajouter une entrée
      </ActionButton>
    </div>

    <Modal
      v-show="isModalVisible"
      @close="closeModal"
    >
      <template v-slot:header>
        <h3>Modifier cette entrée</h3>
      </template>

      <template v-slot:body>
        <div class="form">
          <div class="form-group">
            <label for="emoji">Emoji</label>
            <Input key="emoji" type="text" class="form-control" v-model="emojiInModal" />
          </div>
          <div class="form-group">
            <label for="words">Mots</label>
            <vue-tags-input
              v-model="tag"
              :tags="wordsInModal"
              @tags-changed="newTags => wordsInModal = newTags"
            />
          </div>
          <ActionButton @click="editEntry">Enregistrer</ActionButton>
        </div>
      </template>
    </Modal>
  </div>
</template>

<style scoped>
  .title {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
  }

  .backButton {
    max-width: max-content;
    display: flex;
    margin-right: 2rem;
  }

  .backButton svg {
    margin-right: 0.5rem;
  }

  .entries {
    margin-bottom: 1rem;
  }

  .entry:last-child {
    border-bottom: 1px solid #ccc;
  }

  .entry {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    font-size: 1.5rem;
  }

  .emoji {
    margin-right: 2rem;
    font-size: 2rem;
  }

  .words {
    display: flex;
    justify-content: space-between;
  }

  .word {
    margin-right: 0.5rem;
    background-color: #43a9fc;
    border-radius: 0.5rem;
    color: white;
    padding: 0 0.5rem;
  }

  .editWordsButton {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    padding: 0.5rem;
    background-color: #4842fe;
    width: 4rem;
  }

  .addBox {
    display: flex;
    justify-content: flex-end;
  }

  .addEntryButton {
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

<style v-slot:body>
  .form {
    width: 20rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  .ti-input {
    border-radius: 0.5rem;
    padding: 0.5rem !important;
  }
</style>