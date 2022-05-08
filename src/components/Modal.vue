<script setup>

const emit = defineEmits(['close'])

const close = () => {
  emit("close")
}

</script>

<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          This is the default title!
        </slot>
        <button
          type="button"
          class="btn-close"
          @click="close"
        >
          x
        </button>
      </header>

      <section class="modal-body">
        <slot name="body">
          This is the default body!
        </slot>
       </section>
    </div>
  </div>
</template>


<style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
  }

  .modal-header,
  .modal-footer {
    padding: 1rem;
    display: flex;
  }

  .modal-header {
    position: relative;
    color: #000000;
    justify-content: space-between;
    align-items: center;
  }

  .modal-body {
    position: relative;
    padding: 0rem 1rem 1rem 1rem;
    color: #000000;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #000000;
    background: transparent;
  }

</style>